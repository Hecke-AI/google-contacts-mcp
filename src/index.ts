#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import * as fs from 'fs';
import * as path from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';

// Get script directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let peopleService: any;

try {
  // Load shared credentials and token
  const credsPath = path.join(__dirname, 'gcp-oauth.keys.json');
  const tokenPath = path.join(homedir(), '.config/google-calendar-mcp/tokens.json');

  // Initialize OAuth
  const credsData = JSON.parse(fs.readFileSync(credsPath, 'utf-8'));
  const { client_id, client_secret } = credsData.installed;

  const oauth2Client = new OAuth2Client(client_id, client_secret, 'http://localhost');

  // Load tokens
  const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
  oauth2Client.setCredentials(tokenData.normal);

  peopleService = google.people({ version: 'v1', auth: oauth2Client });

  console.error('Google Contacts MCP server initialized');
} catch (error) {
  console.error('FATAL: Failed to initialize Google Contacts:', error);
  process.exit(1);
}

// Create MCP server
const server = new Server(
  {
    name: 'google-contacts',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
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
    {
      name: 'list_contacts',
      description: 'List all contacts',
      inputSchema: {
        type: 'object',
        properties: {
          max_results: {
            type: 'number',
            description: 'Maximum number of results to return (default: 100)',
            default: 100,
          },
        },
      },
    },
    {
      name: 'get_contact',
      description: 'Get detailed information about a specific contact by resource name',
      inputSchema: {
        type: 'object',
        properties: {
          resource_name: {
            type: 'string',
            description: 'Resource name of the contact (e.g., people/c1234567890)',
          },
        },
        required: ['resource_name'],
      },
    },
    {
      name: 'create_contact',
      description: 'Create a new contact',
      inputSchema: {
        type: 'object',
        properties: {
          given_name: {
            type: 'string',
            description: 'First name',
          },
          family_name: {
            type: 'string',
            description: 'Last name',
          },
          email: {
            type: 'string',
            description: 'Email address',
          },
          phone: {
            type: 'string',
            description: 'Phone number',
          },
          organization: {
            type: 'string',
            description: 'Company/organization name',
          },
          job_title: {
            type: 'string',
            description: 'Job title',
          },
        },
        required: ['given_name'],
      },
    },
    {
      name: 'delete_contact',
      description: 'Delete a contact by resource name',
      inputSchema: {
        type: 'object',
        properties: {
          resource_name: {
            type: 'string',
            description: 'Resource name of the contact to delete (e.g., people/c1234567890)',
          },
        },
        required: ['resource_name'],
      },
    },
  ],
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'list_contacts': {
        const maxResults = (args?.max_results as number) || 100;
        const response = await peopleService.people.connections.list({
          resourceName: 'people/me',
          pageSize: maxResults,
          personFields: 'names,emailAddresses,phoneNumbers,organizations',
        });

        const connections = response.data.connections || [];
        const formatted = connections.map((person: any) => {
          const names = person.names?.[0];
          const emails = person.emailAddresses?.map((e: any) => e.value).join(', ') || 'No email';
          const phones = person.phoneNumbers?.map((p: any) => p.value).join(', ') || 'No phone';
          const org = person.organizations?.[0]?.name || '';

          return {
            resourceName: person.resourceName,
            displayName: names?.displayName || 'Unknown',
            givenName: names?.givenName || '',
            familyName: names?.familyName || '',
            email: emails,
            phone: phones,
            organization: org,
          };
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(formatted, null, 2),
            },
          ],
        };
      }

      case 'search_contacts': {
        const query = args?.query as string;
        const maxResults = (args?.max_results as number) || 10;

        const response = await peopleService.people.connections.list({
          resourceName: 'people/me',
          pageSize: 500,
          personFields: 'names,emailAddresses,phoneNumbers,organizations',
        });

        const connections = response.data.connections || [];
        const searchLower = query.toLowerCase();
        const matches = connections
          .filter((person: any) => {
            const displayName = person.names?.[0]?.displayName?.toLowerCase() || '';
            const email = person.emailAddresses?.[0]?.value?.toLowerCase() || '';
            const phone = person.phoneNumbers?.[0]?.value || '';

            return (
              displayName.includes(searchLower) ||
              email.includes(searchLower) ||
              phone.includes(searchLower)
            );
          })
          .slice(0, maxResults)
          .map((person: any) => {
            const names = person.names?.[0];
            const emails = person.emailAddresses?.map((e: any) => e.value).join(', ') || 'No email';
            const phones = person.phoneNumbers?.map((p: any) => p.value).join(', ') || 'No phone';
            const org = person.organizations?.[0]?.name || '';

            return {
              resourceName: person.resourceName,
              displayName: names?.displayName || 'Unknown',
              givenName: names?.givenName || '',
              familyName: names?.familyName || '',
              email: emails,
              phone: phones,
              organization: org,
            };
          });

        return {
          content: [
            {
              type: 'text',
              text:
                matches.length > 0
                  ? JSON.stringify(matches, null, 2)
                  : `No contacts found matching "${query}"`,
            },
          ],
        };
      }

      case 'get_contact': {
        const resourceName = args?.resource_name as string;
        const response = await peopleService.people.get({
          resourceName: resourceName,
          personFields: 'names,emailAddresses,phoneNumbers,addresses,organizations,biographies',
        });

        const person = response.data;
        const names = person.names?.[0];

        const formatted = {
          resourceName: person.resourceName,
          displayName: names?.displayName || 'Unknown',
          givenName: names?.givenName || '',
          familyName: names?.familyName || '',
          emails: person.emailAddresses?.map((e: any) => e.value) || [],
          phones: person.phoneNumbers?.map((p: any) => p.value) || [],
          addresses: person.addresses?.map((a: any) => a.formattedValue) || [],
          organizations: person.organizations?.map((o: any) => o.name) || [],
          biography: person.biographies?.[0]?.value || '',
        };

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(formatted, null, 2),
            },
          ],
        };
      }

      case 'create_contact': {
        const givenName = args?.given_name as string;
        const familyName = args?.family_name as string;
        const email = args?.email as string;
        const phone = args?.phone as string;
        const organization = args?.organization as string;
        const jobTitle = args?.job_title as string;

        const contactResource: any = {};

        // Add name
        if (givenName || familyName) {
          contactResource.names = [{
            givenName: givenName || '',
            familyName: familyName || '',
          }];
        }

        // Add email
        if (email) {
          contactResource.emailAddresses = [{
            value: email,
          }];
        }

        // Add phone
        if (phone) {
          contactResource.phoneNumbers = [{
            value: phone,
          }];
        }

        // Add organization
        if (organization || jobTitle) {
          contactResource.organizations = [{
            name: organization || '',
            title: jobTitle || '',
          }];
        }

        const response = await peopleService.people.createContact({
          requestBody: contactResource,
        });

        const person = response.data;
        const names = person.names?.[0];

        const formatted = {
          resourceName: person.resourceName,
          displayName: names?.displayName || 'Unknown',
          givenName: names?.givenName || '',
          familyName: names?.familyName || '',
          emails: person.emailAddresses?.map((e: any) => e.value) || [],
          phones: person.phoneNumbers?.map((p: any) => p.value) || [],
          organizations: person.organizations?.map((o: any) => ({ name: o.name, title: o.title })) || [],
        };

        return {
          content: [
            {
              type: 'text',
              text: `Contact created successfully:\n${JSON.stringify(formatted, null, 2)}`,
            },
          ],
        };
      }

      case 'delete_contact': {
        const resourceName = args?.resource_name as string;

        await peopleService.people.deleteContact({
          resourceName: resourceName,
        });

        return {
          content: [
            {
              type: 'text',
              text: `Contact ${resourceName} deleted successfully`,
            },
          ],
        };
      }

      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }
  } catch (error) {
    throw new McpError(
      ErrorCode.InternalError,
      `Tool execution failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Google Contacts MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
