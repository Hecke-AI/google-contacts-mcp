# Architecture: How the MCP Server Works

This guide explains the internal architecture of the Google Contacts MCP server, helping you understand how all the pieces fit together.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Claude Code                            │
│                                                              │
│  1. User: "Search for contacts named Charlie"              │
│  2. Claude decides to use search_contacts tool             │
│  3. Claude sends MCP request                                │
└──────────────────────┬──────────────────────────────────────┘
                       │ MCP Protocol (stdio)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Google Contacts MCP Server                      │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 1. Receive Request                                     │ │
│  │    - Parse tool name: "search_contacts"                │ │
│  │    - Extract arguments: { query: "Charlie" }           │ │
│  └────────────────────────────────────────────────────────┘ │
│                       │                                      │
│  ┌────────────────────▼───────────────────────────────────┐ │
│  │ 2. OAuth Authentication                                │ │
│  │    - Load credentials from gcp-oauth.keys.json         │ │
│  │    - Load tokens from ~/.config/.../tokens.json        │ │
│  │    - Refresh if expired                                │ │
│  └────────────────────┬───────────────────────────────────┘ │
│                       │                                      │
│  ┌────────────────────▼───────────────────────────────────┐ │
│  │ 3. Call Google People API                              │ │
│  │    - peopleService.people.connections.list()           │ │
│  │    - Filter results by search query                    │ │
│  └────────────────────┬───────────────────────────────────┘ │
│                       │                                      │
│  ┌────────────────────▼───────────────────────────────────┐ │
│  │ 4. Format Response                                     │ │
│  │    - Extract: name, email, phone, organization         │ │
│  │    - Return as JSON                                    │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │ MCP Protocol (stdio)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Google People API                         │
│                                                              │
│  - Authenticates request                                    │
│  - Queries contact database                                 │
│  - Returns contact resources                                │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Breakdown

### 1. MCP Server Initialization

**File:** `src/index.ts` (lines 1-44)

```typescript
// Load OAuth credentials
const credsPath = path.join(__dirname, 'gcp-oauth.keys.json');
const tokenPath = path.join(homedir(), '.config/google-calendar-mcp/tokens.json');

// Initialize OAuth2 client
const credsData = JSON.parse(fs.readFileSync(credsPath, 'utf-8'));
const { client_id, client_secret } = credsData.installed;
const oauth2Client = new OAuth2Client(client_id, client_secret, 'http://localhost');

// Load existing tokens
const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
oauth2Client.setCredentials(tokenData.normal);

// Create Google People service
peopleService = google.people({ version: 'v1', auth: oauth2Client });
```

**What's happening:**
1. **Credentials loading:** Reads your `gcp-oauth.keys.json` file containing client ID and secret
2. **OAuth client creation:** Initializes Google's OAuth2 client
3. **Token loading:** Loads previously saved access/refresh tokens
4. **Service initialization:** Creates authenticated People API client

📸 **DIAGRAM NEEDED: `docs/images/architecture/01-initialization-flow.png`**
- *Flowchart showing file loading → OAuth client → API service*

---

### 2. Tool Registration

**File:** `src/index.ts` (lines 60-144)

```typescript
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'search_contacts',
      description: 'Search for contacts by name, email, or phone number',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search term to find in contacts',
          },
          max_results: {
            type: 'number',
            description: 'Maximum number of results to return (default: 10)',
            default: 10,
          },
        },
        required: ['query'],
      },
    },
    // ... more tools
  ],
}));
```

**What's happening:**
1. **Tool definition:** Each tool has a name, description, and input schema
2. **JSON Schema:** Input validation using JSON Schema format
3. **Claude integration:** Claude reads these definitions to know what tools are available

📸 **DIAGRAM NEEDED: `docs/images/architecture/02-tool-registration.png`**
- *Visual showing tool definition → Claude's understanding → user request*

---

### 3. Request Handling

**File:** `src/index.ts` (lines 147-351)

```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'search_contacts': {
        // Extract arguments
        const query = args?.query as string;
        const maxResults = (args?.max_results as number) || 10;

        // Call Google API
        const response = await peopleService.people.connections.list({
          resourceName: 'people/me',
          pageSize: 500,
          personFields: 'names,emailAddresses,phoneNumbers,organizations',
        });

        // Filter and format results
        const connections = response.data.connections || [];
        const matches = connections
          .filter(person => /* matching logic */)
          .slice(0, maxResults)
          .map(person => /* format person */);

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(matches, null, 2),
          }],
        };
      }
      // ... other tools
    }
  } catch (error) {
    // Error handling
  }
});
```

**Request flow:**
1. **Parse request:** Extract tool name and arguments
2. **Validate:** Ensure required parameters exist
3. **Execute:** Call appropriate Google API
4. **Transform:** Convert API response to user-friendly format
5. **Return:** Send formatted response back to Claude

📸 **DIAGRAM NEEDED: `docs/images/architecture/03-request-flow.png`**
- *Sequence diagram: Claude → MCP Server → Google API → Response*

---

## OAuth 2.0 Flow

### Initial Authentication (First Run)

```
┌──────────┐                                      ┌──────────────┐
│   User   │                                      │ MCP Server   │
└────┬─────┘                                      └──────┬───────┘
     │                                                   │
     │ 1. npm run auth                                   │
     │──────────────────────────────────────────────────>│
     │                                                   │
     │                                       2. No tokens found
     │                                       3. Generate auth URL
     │                                                   │
     │ 4. Open browser                                   │
     │<──────────────────────────────────────────────────│
     │                                                   │
┌────▼──────────────────────────────────────────────────▼──────┐
│                    Browser (Google OAuth)                     │
│                                                               │
│  5. User signs in                                            │
│  6. User grants permissions                                  │
│  7. Redirect to http://localhost with auth code              │
└────┬──────────────────────────────────────────────────┬──────┘
     │                                                   │
     │ 8. Auth code                                      │
     │──────────────────────────────────────────────────>│
     │                                                   │
     │                                        9. Exchange code
     │                                           for tokens
     │                                                   │
     │                                       10. Save tokens to
     │                                           ~/.config/.../tokens.json
     │                                                   │
     │ 11. "Authentication successful!"                  │
     │<──────────────────────────────────────────────────│
     │                                                   │
```

📸 **SCREENSHOT NEEDED: `docs/images/architecture/04-oauth-flow.png`**
- *Complete OAuth flow diagram*

### Subsequent Requests (Token Refresh)

```typescript
// Automatic token refresh (handled by googleapis library)
oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // Got new tokens, save them
    saveTokens(tokens);
  }
});
```

**How it works:**
1. Access tokens expire after 1 hour
2. Library automatically uses refresh token to get new access token
3. New tokens are saved to disk
4. User never has to re-authenticate (unless refresh token expires)

---

## Google People API Integration

### Resource Structure

Google contacts are represented as `Person` resources:

```json
{
  "resourceName": "people/c1234567890",
  "etag": "%AbCdEfGh",
  "names": [{
    "displayName": "John Smith",
    "givenName": "John",
    "familyName": "Smith"
  }],
  "emailAddresses": [{
    "value": "john@example.com",
    "type": "work"
  }],
  "phoneNumbers": [{
    "value": "+1-555-1234",
    "type": "mobile"
  }],
  "organizations": [{
    "name": "ACME Corp",
    "title": "Engineer"
  }]
}
```

### API Endpoints Used

| Tool | API Method | Endpoint |
|------|------------|----------|
| `list_contacts` | `people.connections.list` | `GET /v1/people/me/connections` |
| `search_contacts` | `people.connections.list` + filter | `GET /v1/people/me/connections` |
| `get_contact` | `people.get` | `GET /v1/{resourceName}` |
| `create_contact` | `people.createContact` | `POST /v1/people:createContact` |
| `delete_contact` | `people.deleteContact` | `DELETE /v1/{resourceName}:deleteContact` |

### Pagination

The People API returns up to 1000 contacts per request. For larger datasets:

```typescript
let allContacts = [];
let pageToken = null;

do {
  const response = await peopleService.people.connections.list({
    resourceName: 'people/me',
    pageSize: 1000,
    pageToken: pageToken,
    personFields: 'names,emailAddresses',
  });

  allContacts = allContacts.concat(response.data.connections || []);
  pageToken = response.data.nextPageToken;
} while (pageToken);
```

---

## Error Handling

### MCP Error Codes

The server uses standard MCP error codes:

```typescript
try {
  // API call
} catch (error) {
  throw new McpError(
    ErrorCode.InternalError,
    `Tool execution failed: ${error.message}`
  );
}
```

**Common error codes:**
- `MethodNotFound` - Unknown tool requested
- `InvalidParams` - Missing or invalid parameters
- `InternalError` - API call failed

### Google API Errors

Common errors and how they're handled:

| Error | HTTP Code | Meaning | Solution |
|-------|-----------|---------|----------|
| `PERMISSION_DENIED` | 403 | Missing scopes | Check OAuth scopes in Google Cloud |
| `NOT_FOUND` | 404 | Contact doesn't exist | Return empty result |
| `UNAUTHENTICATED` | 401 | Token expired | Refresh token automatically |
| `RESOURCE_EXHAUSTED` | 429 | Rate limit | Implement backoff retry |

---

## Data Flow Example: Search Contacts

Let's trace a complete request:

### 1. User Request
```
User: "Search for contacts named Charlie"
```

### 2. Claude Interprets
```json
{
  "tool": "search_contacts",
  "arguments": {
    "query": "Charlie",
    "max_results": 10
  }
}
```

### 3. MCP Server Receives
```typescript
const { name, arguments: args } = request.params;
// name = "search_contacts"
// args = { query: "Charlie", max_results: 10 }
```

### 4. API Call
```typescript
const response = await peopleService.people.connections.list({
  resourceName: 'people/me',
  pageSize: 500,
  personFields: 'names,emailAddresses,phoneNumbers,organizations',
});
```

### 5. Filter Results
```typescript
const matches = connections
  .filter((person) => {
    const displayName = person.names?.[0]?.displayName?.toLowerCase() || '';
    return displayName.includes('charlie');
  })
  .slice(0, 10);
```

### 6. Format Response
```json
[
  {
    "resourceName": "people/c1234567890",
    "displayName": "Eric Stratton",
    "email": "eric@ahouse.com",
    "phone": "+1-703-555-1212",
    "organization": "Tech Corp"
  }
]
```

### 7. Return to Claude
```
Found 1 contact matching "Eric":
- Eric Stratton (eric@ahouse.com, +1-703-555-1212)
```

📸 **DIAGRAM NEEDED: `docs/images/architecture/05-complete-flow.png`**
- *End-to-end data flow from user to response*

---

## Performance Considerations

### Caching Strategy

The current implementation doesn't cache results. For production use, consider:

```typescript
// Simple in-memory cache
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getCachedContacts() {
  const cached = cache.get('all_contacts');
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const contacts = await fetchAllContacts();
  cache.set('all_contacts', { data: contacts, timestamp: Date.now() });
  return contacts;
}
```

### Rate Limiting

Google People API quotas:
- **Queries per day:** 15,000
- **Queries per minute:** 600
- **Queries per second:** 10

For bulk operations, implement exponential backoff:

```typescript
async function withRetry(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.code === 429 && i < maxRetries - 1) {
        await sleep(Math.pow(2, i) * 1000); // Exponential backoff
      } else {
        throw error;
      }
    }
  }
}
```

---

## Security Best Practices

### 1. Credential Storage

✅ **DO:**
- Store `gcp-oauth.keys.json` locally only
- Add to `.gitignore`
- Use environment variables for production

❌ **DON'T:**
- Commit credentials to Git
- Share credentials files
- Hardcode secrets

### 2. Token Management

✅ **DO:**
- Store tokens in user config directory
- Set proper file permissions (600)
- Use refresh tokens for long-term access

❌ **DON'T:**
- Log tokens
- Store in plaintext in public locations
- Share tokens between users

### 3. Scope Minimization

Request only the scopes you need:

```typescript
// Good: Read-only if you only read
scopes: ['https://www.googleapis.com/auth/contacts.readonly']

// Bad: Requesting full access when read-only would suffice
scopes: ['https://www.googleapis.com/auth/contacts']
```

---

## Extending the Server

### Adding a New Tool

To add a new tool (e.g., `update_contact`):

1. **Add tool definition:**
```typescript
{
  name: 'update_contact',
  description: 'Update an existing contact',
  inputSchema: {
    type: 'object',
    properties: {
      resource_name: { type: 'string' },
      email: { type: 'string' },
      // ... more fields
    },
    required: ['resource_name'],
  },
}
```

2. **Add handler:**
```typescript
case 'update_contact': {
  const resourceName = args?.resource_name as string;
  const email = args?.email as string;

  // Fetch existing contact
  const person = await peopleService.people.get({
    resourceName,
    personFields: 'emailAddresses',
  });

  // Update fields
  const updated = await peopleService.people.updateContact({
    resourceName,
    updatePersonFields: 'emailAddresses',
    requestBody: {
      emailAddresses: [{ value: email }],
      etag: person.data.etag,
    },
  });

  return { /* formatted response */ };
}
```

3. **Test it!**

---

## Next Steps

Now that you understand the architecture:

- **[Build Your Own MCP Server](04-building-your-own.md)** - Apply these concepts
- **[Troubleshooting Guide](05-troubleshooting.md)** - Debug common issues
- **[Examples](../examples/)** - See real-world usage

---

## Architecture Diagram Checklist

For complete documentation, create:

- [ ] High-level architecture diagram
- [ ] Tool registration flow
- [ ] Request handling sequence
- [ ] OAuth flow diagram
- [ ] Complete data flow example

**Total diagrams needed:** 5
