# Screenshot Checklist for Documentation

This checklist tracks all screenshots needed for the Google Contacts MCP repository documentation. Use this as your guide when capturing screenshots from Google Cloud Console and other tools.

**Total Screenshots Needed:** 34
**Total Diagrams Needed:** 5

---

## Setup Guide Screenshots (29)

### Google Cloud Project Setup (4 screenshots)

- [ ] **01-console-home.png** - Google Cloud Console home page
  - *Location: `docs/images/setup/`*
  - *Shows: Main GCP console dashboard*

- [ ] **02-new-project-button.png** - New Project button
  - *Location: `docs/images/setup/`*
  - *Shows: Project dropdown with "New Project" highlighted*
  - *Annotations: Red box around "New Project" button*

- [ ] **03-project-form.png** - Project creation form
  - *Location: `docs/images/setup/`*
  - *Shows: Form with project name filled in*
  - *Annotations: Step numbers (① Project name, ② Create button)*

- [ ] **04-project-created.png** - Project created confirmation
  - *Location: `docs/images/setup/`*
  - *Shows: Success notification and project dashboard*

### Enable Google People API (5 screenshots)

- [ ] **05-apis-services-menu.png** - APIs & Services menu
  - *Location: `docs/images/setup/`*
  - *Shows: Left sidebar with "APIs & Services" highlighted*
  - *Annotations: Highlight menu item and "Library" submenu*

- [ ] **06-api-library.png** - API Library page
  - *Location: `docs/images/setup/`*
  - *Shows: API Library with search bar*
  - *Annotations: "Search for Google People API here"*

- [ ] **07-people-api-search.png** - Search results
  - *Location: `docs/images/setup/`*
  - *Shows: "Google People API" card in search results*
  - *Annotations: Red box around correct API card, "Click this card"*

- [ ] **08-enable-api-button.png** - Enable API button
  - *Location: `docs/images/setup/`*
  - *Shows: API details page with blue "Enable" button*
  - *Annotations: Red box highlighting Enable button*

- [ ] **09-api-enabled.png** - API enabled confirmation
  - *Location: `docs/images/setup/`*
  - *Shows: API dashboard showing enabled status and usage metrics*

### OAuth Consent Screen (8 screenshots)

- [ ] **10-oauth-menu.png** - OAuth consent screen menu
  - *Location: `docs/images/setup/`*
  - *Shows: "OAuth consent screen" highlighted in menu*

- [ ] **11-user-type-selection.png** - User type selection
  - *Location: `docs/images/setup/`*
  - *Shows: Internal vs External radio buttons*
  - *Annotations: Highlight "External" option, "Choose External for personal use"*

- [ ] **12-app-information.png** - App information form
  - *Location: `docs/images/setup/`*
  - *Shows: Form filled out with app name, support email, developer contact*
  - *Annotations: Step numbers for required fields*

- [ ] **13-add-scopes-button.png** - Add scopes button
  - *Location: `docs/images/setup/`*
  - *Shows: Scopes page with "Add or Remove Scopes" button*
  - *Annotations: Highlight button*

- [ ] **14-select-scopes.png** - Scope selection
  - *Location: `docs/images/setup/`*
  - *Shows: Scopes dialog with contacts scope visible*
  - *Annotations: Highlight checkbox, "Check this box for read/write access"*

- [ ] **15-scopes-selected.png** - Selected scopes confirmation
  - *Location: `docs/images/setup/`*
  - *Shows: Confirmation screen showing selected scope name and description*

- [ ] **16-add-test-users.png** - Add test users
  - *Location: `docs/images/setup/`*
  - *Shows: Test users page with email input and added email*
  - *Annotations: "Add your Gmail address here"*

- [ ] **17-oauth-summary.png** - OAuth summary
  - *Location: `docs/images/setup/`*
  - *Shows: Summary page with app name, scopes, test users*
  - *Annotations: Highlight "Testing" status*

### Create OAuth Credentials (6 screenshots)

- [ ] **18-credentials-menu.png** - Credentials menu
  - *Location: `docs/images/setup/`*
  - *Shows: "Credentials" highlighted in APIs & Services menu*

- [ ] **19-create-credentials-dropdown.png** - Create credentials dropdown
  - *Location: `docs/images/setup/`*
  - *Shows: Dropdown menu with credential types*
  - *Annotations: Highlight "OAuth client ID" option*

- [ ] **20-application-type.png** - Application type selection
  - *Location: `docs/images/setup/`*
  - *Shows: Dropdown with "Desktop app" selected*
  - *Annotations: "Choose Desktop app for CLI/local applications"*

- [ ] **21-oauth-client-form.png** - OAuth client form
  - *Location: `docs/images/setup/`*
  - *Shows: Form with application type and name filled in*

- [ ] **22-credentials-created.png** - Credentials created modal
  - *Location: `docs/images/setup/`*
  - *Shows: Success modal with Client ID, Client Secret, Download JSON button*
  - *Annotations: Red box around "Download JSON", "⚠️ IMPORTANT: Click Download JSON"*

- [ ] **23-downloaded-json.png** - Downloaded JSON file
  - *Location: `docs/images/setup/`*
  - *Shows: Finder/Explorer showing downloaded credentials file*
  - *Annotations: "Rename this to gcp-oauth.keys.json"*

### First-Time Authentication (6 screenshots)

- [ ] **24-browser-oauth-signin.png** - Google sign-in page
  - *Location: `docs/images/setup/`*
  - *Shows: Google OAuth sign-in page in browser*
  - *Annotations: "Sign in with your Google account"*

- [ ] **25-permission-grant.png** - Permission request screen
  - *Location: `docs/images/setup/`*
  - *Shows: "Google Contacts MCP wants to access..." with permissions list*
  - *Annotations: Highlight permissions, "These are the scopes you configured earlier"*

- [ ] **26-app-not-verified.png** - App not verified warning
  - *Location: `docs/images/setup/`*
  - *Shows: "This app isn't verified" warning*
  - *Annotations: Highlight "Advanced" link, instructions to proceed*

- [ ] **27-authorization-success.png** - Authorization success
  - *Location: `docs/images/setup/`*
  - *Shows: Success page or terminal confirmation*

- [ ] **28-tokens-saved.png** - Tokens saved confirmation
  - *Location: `docs/images/setup/`*
  - *Shows: Terminal showing tokens.json file exists*
  - *Annotations: "Your OAuth tokens are stored here securely"*

- [ ] **29-claude-code-test.png** - Claude Code test
  - *Location: `docs/images/setup/`*
  - *Shows: Claude Code successfully using search_contacts tool*
  - *Annotations: Highlight the tool use in response*

---

## Usage Examples (3 screenshots)

- [ ] **example-search.png** - Search contacts example
  - *Location: `docs/images/usage/`*
  - *Shows: Claude Code searching for contacts with results*

- [ ] **example-create.png** - Create contact example
  - *Location: `docs/images/usage/`*
  - *Shows: Claude Code creating a new contact*

- [ ] **example-bulk-delete.png** - Bulk deletion workflow
  - *Location: `docs/images/usage/`*
  - *Shows: Claude Code deleting multiple contacts with confirmation*

---

## Troubleshooting Screenshots (2 screenshots)

- [ ] **error-api-not-enabled.png** - API not enabled error
  - *Location: `docs/images/troubleshooting/`*
  - *Shows: Error message when API isn't enabled*
  - *Error text: "Google People API has not been used in project..."*

- [ ] **error-invalid-scope.png** - Invalid scope error
  - *Location: `docs/images/troubleshooting/`*
  - *Shows: Error when wrong scopes are configured*

---

## Architecture Diagrams (5 diagrams)

These should be created as clean diagrams (not screenshots):

- [ ] **01-initialization-flow.png** - Server initialization flowchart
  - *Location: `docs/images/architecture/`*
  - *Shows: File loading → OAuth client → API service*
  - *Tool: draw.io, Lucidchart, or similar*

- [ ] **02-tool-registration.png** - Tool registration flow
  - *Location: `docs/images/architecture/`*
  - *Shows: Tool definition → Claude's understanding → user request*
  - *Tool: draw.io, Lucidchart, or similar*

- [ ] **03-request-flow.png** - Request handling sequence
  - *Location: `docs/images/architecture/`*
  - *Shows: Sequence diagram: Claude → MCP Server → Google API → Response*
  - *Tool: draw.io, Lucidchart, or Mermaid*

- [ ] **04-oauth-flow.png** - Complete OAuth flow
  - *Location: `docs/images/architecture/`*
  - *Shows: Full authentication flow from user to token storage*
  - *Tool: draw.io, Lucidchart, or similar*

- [ ] **05-complete-flow.png** - End-to-end data flow
  - *Location: `docs/images/architecture/`*
  - *Shows: Complete flow from user request to formatted response*
  - *Tool: draw.io, Lucidchart, or similar*

---

## Screenshot Standards

### Technical Requirements

- **Format:** PNG (for screenshots), PNG or SVG (for diagrams)
- **Resolution:** Minimum 1920x1080 for screenshots, vector for diagrams
- **File size:** Compress to < 500KB when possible
- **Naming:** Use kebab-case, descriptive names

### Visual Guidelines

**For Screenshots:**
- Clean browser/window (no extra tabs/clutter)
- Default/light theme preferred
- Zoom level that makes text readable
- No personal information visible (redact if needed)

**For Annotations:**
- Red boxes/circles for highlighting
- Step numbers in circles: ①, ②, ③
- Arrow annotations for "click here" indicators
- Text annotations in clear, readable font (14pt minimum)

**For Diagrams:**
- Clean, professional appearance
- Consistent color scheme (use MCP/Google brand colors)
- Clear labels and arrows
- Logical flow (left-to-right or top-to-bottom)

### Tools Recommended

**For Screenshots:**
- macOS: Cmd+Shift+4 (built-in)
- Windows: Snipping Tool or Greenshot
- Browser: Full-page screenshot extensions

**For Annotations:**
- Skitch (macOS)
- Snagit
- Preview (macOS) - built-in markup tools
- GIMP/Photoshop for advanced editing

**For Diagrams:**
- draw.io (free, web-based)
- Lucidchart
- Mermaid (code-based diagrams)
- Excalidraw (hand-drawn style)

---

## Capture Workflow

### Recommended Order:

1. **Setup fresh Google Cloud project** (don't use existing project with history)
2. **Capture all 29 setup screenshots** in one session for consistency
3. **Complete setup** to generate OAuth tokens
4. **Capture usage examples** with real Claude Code interactions
5. **Create diagrams** based on working implementation
6. **Add annotations** to all screenshots using preferred tool

### Quality Checklist (per screenshot):

- [ ] Correct content visible
- [ ] No sensitive information (credentials, emails, etc.)
- [ ] Proper resolution (readable text)
- [ ] Clean interface (no extra windows/clutter)
- [ ] Annotations added where needed
- [ ] File properly named
- [ ] Placed in correct directory
- [ ] Referenced in documentation

---

## Progress Tracking

**Setup Guide:** 0/29 complete
**Usage Examples:** 0/3 complete
**Troubleshooting:** 0/2 complete
**Architecture Diagrams:** 0/5 complete

**Total Progress:** 0/39 complete (0%)

---

## Post-Capture Tasks

After all screenshots/diagrams are captured:

- [ ] Review all images for quality
- [ ] Ensure no sensitive data is visible
- [ ] Compress large files
- [ ] Update documentation with final image references
- [ ] Test all image links in rendered Markdown
- [ ] Create a demo video (optional but recommended)
- [ ] Archive source files (Photoshop, draw.io, etc.) separately

---

## Notes

- Screenshots should be captured during actual setup process, not mocked
- Use a clean Google account or create test account for pristine screenshots
- Keep source files (PSDs, draw.io files) in case edits needed later
- Consider creating a video walkthrough in addition to screenshots
- Test all documentation links after images are added

---

**Ready to capture screenshots?** Follow the Setup Guide (docs/02-setup-guide.md) and check off items as you go!
