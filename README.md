# Google Contacts MCP Server

> "My two requirements were, interface via MCP to my Google Contacts for ease of adding/updating contacts,and perform some curation on my contact list. I had 750 contacts from all the way back to the early 2000's. These included defunct taxi services, and people I'd never contact again. This MCP server helped me clean it down to 297 relevant contacts in one afternoon." - Chris Spirito

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that integrates Google Contacts with Claude, enabling contact management directly from your AI assistant.

**Learn by doing:** This repository not only provides a working MCP server, but teaches you how to build your own from scratch.

## Features

- 🔍 **Search contacts** by name, email, or phone
- 📋 **List all contacts** with pagination
- ➕ **Create new contacts** with full details
- 🗑️ **Delete contacts** individually
- 📖 **Get detailed contact info** including addresses and organizations
- 🔐 **Secure OAuth 2.0** authentication

## Real-World Use Case

This MCP server was built to solve a real problem: contact database cleanup. Over 20 years of professional work, my Google Contacts had accumulated:

- Old conference contacts from events a decade ago
- Defunct service vendors (taxi services, contractors)
- Duplicate entries with formatting issues
- Personal contacts mixed with professional ones
- Contacts with missing or outdated information

Using this MCP server with Claude Code, I:
1. **Categorized** 750 contacts into 8 organized groups
2. **Deleted** 446 obsolete contacts automatically
3. **Cleaned** duplicate and malformed entries
4. **Reviewed** remaining contacts efficiently in Excel
5. **Reduced** my contact database by 60% in a few hours

The result? A clean, manageable contact database of 297 relevant contacts.

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Google Cloud account
- Claude Code (or any MCP-compatible client)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/google-contacts-mcp.git
cd google-contacts-mcp

# Install dependencies
npm install

# Build the TypeScript code
npm run build
```

### Setup

1. **Follow the [Setup Guide](docs/02-setup-guide.md)** to configure Google Cloud OAuth
2. **Add to Claude Code's MCP settings** (`~/.config/claude-code/mcp_settings.json`):

```json
{
  "mcpServers": {
    "google-contacts": {
      "command": "node",
      "args": ["/path/to/google-contacts-mcp/dist/index.js"]
    }
  }
}
```

3. **Restart Claude Code** and start using Google Contacts tools!

## Available Tools

- `search_contacts` - Search for contacts by name, email, or phone
- `list_contacts` - List all contacts with pagination
- `get_contact` - Get detailed information about a specific contact
- `create_contact` - Create a new contact
- `delete_contact` - Delete a contact by resource name

## Documentation

- **[Introduction](docs/01-introduction.md)** - Why we built this and what you'll learn
- **[Setup Guide](docs/02-setup-guide.md)** - Step-by-step Google Cloud and OAuth configuration
- **[Architecture](docs/03-architecture.md)** - How the MCP server works under the hood
- **[Building Your Own](docs/04-building-your-own.md)** - Tutorial: Create your own MCP server from scratch
- **[Troubleshooting](docs/05-troubleshooting.md)** - Common issues and solutions

## Example Usage

### Search for a contact
```
You: "Search for contacts named Sarah"
Claude: [uses search_contacts tool]
Found 2 contacts:
- Sarah Johnson (sarah.johnson@example.com)
- Sarah Martinez (smartinez@techcorp.com)
```

### Create a new contact
```
You: "Add a contact for Hans Mueller, senior engineer at SwissTech, email h.mueller@swisstech.ch, phone +41 44 123 4567"
Claude: [uses create_contact tool]
Contact created successfully for Hans Mueller.
```

### Delete obsolete contacts
```
You: "Delete all contacts from the 2015 conference in Berlin"
Claude: [searches, confirms, then uses delete_contact for each]
Deleted 12 contacts from the conference attendee list.
```

## Educational Value

This repository is designed to teach you:

1. **MCP Protocol Basics** - Understanding tool definitions and handlers
2. **OAuth 2.0 Flow** - Implementing secure API authentication
3. **Google APIs** - Working with the People API
4. **TypeScript** - Building type-safe MCP servers
5. **Real-World Application** - Solving actual productivity problems

Perfect for:
- AI/ML engineers learning MCP
- Developers wanting to extend Claude's capabilities
- Anyone building custom AI integrations
- Training courses on AI tool development

## Security & Privacy

- **OAuth 2.0** - Industry-standard authentication
- **Token storage** - Secure local token management
- **No data collection** - All data stays between you and Google
- **Minimal scopes** - Only requests necessary permissions
- **Open source** - Audit the code yourself

## Contributing

Contributions welcome! Please read our [Contributing Guide](CONTRIBUTING.md) first.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built on the [Model Context Protocol](https://modelcontextprotocol.io) by Anthropic
- Uses Google's [People API](https://developers.google.com/people)
- Inspired by real-world contact management challenges

## Author

**Chris Spirito**
- Hacker, Teacher, Storyteller
- 30+ years in cyber defense and nuclear security
- Visiting Professor at University of Tartu (2014-2024)
- Training: [hecke.ai](https://hecke.ai)

---

**Ready to get started?** Head to the [Setup Guide](docs/02-setup-guide.md) to begin!
