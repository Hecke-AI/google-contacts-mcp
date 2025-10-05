# Setup Guide: Google Cloud OAuth Configuration

This guide walks you through setting up Google Cloud OAuth credentials for the Google Contacts MCP server. Follow each step carefully and take screenshots as indicated for documentation purposes.

**Estimated time:** 30 minutes

---

## Overview

To access Google Contacts, you need to:
1. Create a Google Cloud project
2. Enable the Google People API
3. Configure OAuth consent screen
4. Create OAuth 2.0 credentials
5. Download and configure your credentials file
6. Complete first-time authentication

---

## Step 1: Create a Google Cloud Project

### 1.1 Navigate to Google Cloud Console

Go to [https://console.cloud.google.com/](https://console.cloud.google.com/)

📸 **SCREENSHOT NEEDED: `docs/images/setup/01-console-home.png`**
- *The Google Cloud Console home page*

### 1.2 Create a New Project

1. Click the **project dropdown** in the top navigation bar (next to "Google Cloud")
2. Click **"New Project"**

📸 **SCREENSHOT NEEDED: `docs/images/setup/02-new-project-button.png`**
- *Highlight the "New Project" button with a red box*
- *Add annotation: "Click here to create a new project"*

### 1.3 Configure Project Details

1. **Project name:** Enter `google-contacts-mcp` (or your preferred name)
2. **Organization:** Leave as default (No organization)
3. **Location:** Leave as default (No organization)
4. Click **"Create"**

📸 **SCREENSHOT NEEDED: `docs/images/setup/03-project-form.png`**
- *Show the filled-out project creation form*
- *Highlight the project name field*
- *Add step numbers: ① Project name, ② Create button*

### 1.4 Wait for Project Creation

The project creation takes a few seconds. You'll see a notification when complete.

📸 **SCREENSHOT NEEDED: `docs/images/setup/04-project-created.png`**
- *Show the success notification*
- *Project dashboard visible in background*

---

## Step 2: Enable the Google People API

### 2.1 Navigate to API Library

1. From the left sidebar, click **"APIs & Services"**
2. Click **"Library"**

📸 **SCREENSHOT NEEDED: `docs/images/setup/05-apis-services-menu.png`**
- *Highlight "APIs & Services" in the left sidebar*
- *Show the expanded submenu with "Library" option*

### 2.2 Open API Library

📸 **SCREENSHOT NEEDED: `docs/images/setup/06-api-library.png`**
- *The API Library page showing the search bar and popular APIs*
- *Add annotation: "Search for Google People API here"*

### 2.3 Search for Google People API

1. In the search bar, type: **"Google People API"**
2. Click on the **"Google People API"** card in the results

📸 **SCREENSHOT NEEDED: `docs/images/setup/07-people-api-search.png`**
- *Search results showing "Google People API" card*
- *Highlight the correct API card with a red box*
- *Add annotation: "Click this card"*

### 2.4 Enable the API

1. On the Google People API page, click **"Enable"**

📸 **SCREENSHOT NEEDED: `docs/images/setup/08-enable-api-button.png`**
- *The API details page with the blue "Enable" button*
- *Highlight the Enable button with a red box*

### 2.5 Confirm API is Enabled

After enabling, you'll be redirected to the API dashboard.

📸 **SCREENSHOT NEEDED: `docs/images/setup/09-api-enabled.png`**
- *API dashboard showing "Google People API" is enabled*
- *Show the usage metrics (will be 0 initially)*

> **Why this matters:** The People API is Google's modern interface for accessing contact data. Without enabling it, your MCP server won't be able to authenticate or make API calls.

---

## Step 3: Configure OAuth Consent Screen

The OAuth consent screen is what users see when they authorize your application to access their Google Contacts.

### 3.1 Navigate to OAuth Consent Screen

1. From the left sidebar, click **"APIs & Services"**
2. Click **"OAuth consent screen"**

📸 **SCREENSHOT NEEDED: `docs/images/setup/10-oauth-menu.png`**
- *Highlight "OAuth consent screen" in the menu*

### 3.2 Select User Type

You'll see two options:

- **Internal:** Only for Google Workspace organizations
- **External:** For personal Google accounts and testing

For this tutorial, select **"External"** and click **"Create"**

📸 **SCREENSHOT NEEDED: `docs/images/setup/11-user-type-selection.png`**
- *Radio buttons showing Internal vs External*
- *Highlight "External" option*
- *Add annotation: "Choose External for personal use"*

> **Note:** If you select "External," your app will be in "Testing" mode and limited to 100 test users. This is perfect for personal use.

### 3.3 Fill Out App Information

On the "OAuth consent screen" configuration page:

1. **App name:** `Google Contacts MCP`
2. **User support email:** Select your email from dropdown
3. **App logo:** (Optional - can skip)
4. **Application home page:** (Optional - can skip)
5. **Application privacy policy link:** (Optional - can skip)
6. **Application terms of service link:** (Optional - can skip)
7. **Authorized domains:** (Leave empty for now)
8. **Developer contact information:** Enter your email address

Click **"Save and Continue"**

📸 **SCREENSHOT NEEDED: `docs/images/setup/12-app-information.png`**
- *Form showing filled-out app information*
- *Highlight the required fields (App name, User support email, Developer contact)*
- *Add step numbers for each required field*

### 3.4 Configure Scopes

This is the critical step where you specify what permissions your app needs.

1. Click **"Add or Remove Scopes"**

📸 **SCREENSHOT NEEDED: `docs/images/setup/13-add-scopes-button.png`**
- *The Scopes page with "Add or Remove Scopes" button*
- *Highlight the button*

2. In the scopes dialog, scroll down or search for: `contacts`

3. Select the following scope:
   - `https://www.googleapis.com/auth/contacts` (Read, create, edit, and delete contacts)

   **OR** for read-only access:
   - `https://www.googleapis.com/auth/contacts.readonly` (Read-only access)

📸 **SCREENSHOT NEEDED: `docs/images/setup/14-select-scopes.png`**
- *Scopes selection dialog showing Google Contacts scopes*
- *Highlight the contacts scope checkbox*
- *Add annotation: "Check this box for read/write access"*

4. Click **"Update"** at the bottom of the dialog

📸 **SCREENSHOT NEEDED: `docs/images/setup/15-scopes-selected.png`**
- *Confirmation screen showing the selected scope*
- *Show the scope name and description*

5. Click **"Save and Continue"**

> **Security Note:** Only request the minimum scopes you need. If you only need read access, use the `.readonly` scope.

### 3.5 Add Test Users

Since the app is in "Testing" mode, you need to add yourself as a test user.

1. Click **"Add Users"**
2. Enter your Gmail address
3. Click **"Add"**

📸 **SCREENSHOT NEEDED: `docs/images/setup/16-add-test-users.png`**
- *Test users page with email input field*
- *Show an email address added to the list*
- *Add annotation: "Add your Gmail address here"*

4. Click **"Save and Continue"**

### 3.6 Review Summary

Review your OAuth consent screen configuration and click **"Back to Dashboard"**

📸 **SCREENSHOT NEEDED: `docs/images/setup/17-oauth-summary.png`**
- *Summary page showing app name, scopes, and test users*
- *Highlight the "Testing" status*

---

## Step 4: Create OAuth 2.0 Credentials

Now you'll create the actual credentials that your MCP server will use to authenticate.

### 4.1 Navigate to Credentials

1. From the left sidebar, click **"APIs & Services"**
2. Click **"Credentials"**

📸 **SCREENSHOT NEEDED: `docs/images/setup/18-credentials-menu.png`**
- *Highlight "Credentials" in the menu*

### 4.2 Create OAuth Client ID

1. Click **"+ Create Credentials"** at the top
2. Select **"OAuth client ID"** from the dropdown

📸 **SCREENSHOT NEEDED: `docs/images/setup/19-create-credentials-dropdown.png`**
- *Dropdown menu showing credential types*
- *Highlight "OAuth client ID" option*

### 4.3 Select Application Type

1. **Application type:** Select **"Desktop app"** from the dropdown

📸 **SCREENSHOT NEEDED: `docs/images/setup/20-application-type.png`**
- *Application type dropdown with "Desktop app" selected*
- *Add annotation: "Choose Desktop app for CLI/local applications"*

2. **Name:** Enter `Google Contacts MCP Client`

📸 **SCREENSHOT NEEDED: `docs/images/setup/21-oauth-client-form.png`**
- *Form showing application type and name filled in*

3. Click **"Create"**

### 4.4 Download Credentials

After creation, you'll see a modal with your credentials:

📸 **SCREENSHOT NEEDED: `docs/images/setup/22-credentials-created.png`**
- *Success modal showing:*
  - *Your Client ID*
  - *Your Client Secret*
  - *Download JSON button*
- *Highlight the "Download JSON" button with a red box*
- *Add annotation: "⚠️ IMPORTANT: Click Download JSON"*

1. Click **"Download JSON"**
2. The file will download as `client_secret_XXXXX.apps.googleusercontent.com.json`

📸 **SCREENSHOT NEEDED: `docs/images/setup/23-downloaded-json.png`**
- *Finder/Explorer showing the downloaded JSON file*
- *Add annotation: "Rename this to gcp-oauth.keys.json"*

> **Security Warning:** This file contains sensitive credentials. Never commit it to version control!

---

## Step 5: Configure Your MCP Server

### 5.1 Rename and Place the Credentials File

1. Rename the downloaded file to: **`gcp-oauth.keys.json`**
2. Place it in your MCP server's directory (same directory as `src/`)

```bash
cd google-contacts-mcp
mv ~/Downloads/client_secret_*.json ./gcp-oauth.keys.json
```

### 5.2 Verify File Structure

Your `gcp-oauth.keys.json` should look like this:

```json
{
  "installed": {
    "client_id": "YOUR_CLIENT_ID.apps.googleusercontent.com",
    "project_id": "google-contacts-mcp-XXXXX",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "YOUR_CLIENT_SECRET",
    "redirect_uris": ["http://localhost"]
  }
}
```

### 5.3 Update .gitignore

Make sure your `.gitignore` includes:

```
gcp-oauth.keys.json
tokens.json
node_modules/
dist/
.DS_Store
```

> **Critical:** Never commit your credentials file to Git!

---

## Step 6: First-Time Authentication

### 6.1 Build and Run the Server

```bash
npm install
npm run build
node dist/index.js
```

### 6.2 OAuth Browser Flow

When you first run the server, it will:
1. Detect no stored tokens
2. Open your default browser
3. Navigate to Google's OAuth consent page

📸 **SCREENSHOT NEEDED: `docs/images/setup/24-browser-oauth-signin.png`**
- *Google sign-in page in browser*
- *Add annotation: "Sign in with your Google account"*

### 6.3 Grant Permissions

After signing in, you'll see the consent screen:

📸 **SCREENSHOT NEEDED: `docs/images/setup/25-permission-grant.png`**
- *Permission request screen showing:*
  - *"Google Contacts MCP wants to access your Google Account"*
  - *List of requested permissions*
- *Highlight the permissions being requested*
- *Add annotation: "These are the scopes you configured earlier"*

### 6.4 Handle "App Not Verified" Warning

If you see this warning:

📸 **SCREENSHOT NEEDED: `docs/images/setup/26-app-not-verified.png`**
- *"This app isn't verified" warning screen*
- *Highlight the "Advanced" link*
- *Add annotation: "Click 'Advanced' then 'Go to Google Contacts MCP (unsafe)'"*

> **Why this appears:** Your app is in "Testing" mode and not verified by Google. This is normal for personal projects.

1. Click **"Advanced"**
2. Click **"Go to Google Contacts MCP (unsafe)"**

### 6.5 Complete Authorization

Click **"Allow"** to grant permissions.

📸 **SCREENSHOT NEEDED: `docs/images/setup/27-authorization-success.png`**
- *Success page or browser redirect*
- *Or terminal showing "Authentication successful"*

### 6.6 Verify Token Storage

After successful auth, check that tokens were saved:

```bash
ls ~/.config/google-calendar-mcp/tokens.json
```

📸 **SCREENSHOT NEEDED: `docs/images/setup/28-tokens-saved.png`**
- *Terminal showing the tokens.json file exists*
- *Add annotation: "Your OAuth tokens are stored here securely"*

> **Security Note:** This tokens file contains your access and refresh tokens. Keep it secure!

---

## Step 7: Configure Claude Code

### 7.1 Add to MCP Settings

Edit `~/.config/claude-code/mcp_settings.json`:

```json
{
  "mcpServers": {
    "google-contacts": {
      "command": "node",
      "args": ["/absolute/path/to/google-contacts-mcp/dist/index.js"]
    }
  }
}
```

Replace `/absolute/path/to/google-contacts-mcp` with your actual path.

### 7.2 Restart Claude Code

Exit and restart Claude Code to load the new MCP server.

### 7.3 Test the Integration

In Claude Code, try:

```
Search for contacts named "test"
```

If everything is configured correctly, Claude will use the `search_contacts` tool!

📸 **SCREENSHOT NEEDED: `docs/images/setup/29-claude-code-test.png`**
- *Claude Code showing a successful contact search*
- *Highlight the tool use in the response*

---

## Troubleshooting

See [Troubleshooting Guide](05-troubleshooting.md) if you encounter issues.

### Common Issues

**"API not enabled" error:**
- Go back to Step 2 and verify Google People API is enabled

**"Invalid client" error:**
- Check that `gcp-oauth.keys.json` is in the correct location
- Verify the JSON structure matches the expected format

**"Access denied" error:**
- Make sure you added yourself as a test user (Step 3.5)
- Verify the correct scopes are selected (Step 3.4)

**Tokens not saving:**
- Check file permissions on `~/.config/google-calendar-mcp/`
- Ensure the directory exists and is writable

---

## Next Steps

✅ **Setup Complete!** Your Google Contacts MCP server is ready to use.

Continue to:
- [Architecture Guide](03-architecture.md) - Learn how it works
- [Building Your Own](04-building-your-own.md) - Create your own MCP server
- [Examples](../examples/basic-usage.md) - See real-world usage

---

## Screenshot Checklist

For documentation/training purposes, make sure you have:

- [ ] 29 screenshots from this guide
- [ ] All screenshots properly named and placed in `docs/images/setup/`
- [ ] Red boxes/arrows highlighting key UI elements
- [ ] Annotations explaining what to click/do
- [ ] Step numbers where helpful

**Total screenshots needed:** 29
