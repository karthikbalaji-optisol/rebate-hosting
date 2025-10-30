# Sutter Health — Healthcare Refund Demo

This demo showcases a complete healthcare patient portal experience integrating the Onbe Rebate SDK for refund distribution via virtual prepaid cards.

## Overview

The demo simulates a healthcare provider's patient portal where users can:
1. Sign in to their account
2. View payment history for medical visits
3. Discover available refunds via a prominent banner
4. Claim refunds as virtual prepaid cards using the embedded SDK

## Features

### Pages
- **Login** (`index.html`) — Secure sign-in with remember me functionality
- **Dashboard** (`dashboard.html`) — Payment history list with refund banner
- **Visit Details** (`visit.html`) — Transaction breakdown with SDK integration

### Key Interactions
- Refund discovery banner highlights refund-eligible transactions
- Status chips (Paid, Refund Available, Processing) for visual clarity
- Inline SDK integration on visit details page
- Smooth toast notifications for user feedback
- Hash-based routing for seamless navigation

### Branding
- **Colors**: Teal primary (#4db6ac), light teal secondary (#80cbc4)
- **Logo**: Healthcare heart icon
- **Company**: Sutter Health

## Setup & Running

### Prerequisites
1. Mock server must be running on port 8082
2. SDK must be built in `frontend/sdk/dist/`
3. Frontend server running on port 8080

### Start the Demo

1. **Start mock server** (in one terminal):
   ```bash
   cd poc/approach-1/backend/mock_server
   npm install
   npm start
   ```
   Mock server runs on http://localhost:8082

2. **Build SDK** (in another terminal):
   ```bash
   cd poc/approach-1/frontend/sdk
   npm install
   npm run build
   ```

3. **Serve frontend** (in another terminal):
   ```bash
   cd poc/approach-1/frontend
   python3 -m http.server 8080
   ```

4. **Open demo**:
   ```
   http://localhost:8080/sutter_health/
   ```

## Usage Flow

### 1. Login
- Navigate to `http://localhost:8080/sutter_health/`
- Enter any email address (e.g., `john.doe@example.com`)
- Enter any password (validation is cosmetic)
- Check "Remember me" to persist session in localStorage
- Click "Sign In"
- Toast notification confirms success
- Auto-redirect to Dashboard

### 2. Dashboard
- View 4 sample transactions with different statuses
- Refund banner appears at top (for transaction `tx_001`)
- Click "Claim Your Refund" in banner → navigates to visit details
- Or click "View Details" on any transaction → navigates to that visit

### 3. Visit Details
- View visit information: date, provider, specialty, location
- View payment breakdown: original amount, insurance covered, refund amount
- For refund-eligible visits: see refund card section
- Click "Claim Your Refund" button
- SDK section reveals and mounts inline
- Card is automatically fetched and displayed from mock server
- Virtual card preview displays with cardholder name, masked number, CVV, expiry
- Collapsible details panel shows full card information

## Mock Data

### Transactions
- **tx_001**: Dr. Emily Rodriguez, MD — $453.00 — **Refund Available** ($93.00 refund)
- **tx_002**: Dr. Sarah Johnson, DDS — $185.00 — Paid
- **tx_003**: Mountain View Medical Lab — $320.00 — Processing
- **tx_004**: Dr. James Chen, MD — $275.00 — Paid

### Authentication
- Auth state stored in sessionStorage (default) or localStorage (if "Remember me" checked)
- No real backend validation; any credentials accepted
- Logout clears session and redirects to login

## SDK Integration

The SDK is integrated on the Visit Details page using:

```javascript
const sdk = new OnbeRebateSDK.RebateSDK({
  containerId: 'rebate-root',
  primaryColor: '#4db6ac',
  secondaryColor: '#80cbc4',
  companyName: 'Sutter Health',
  customer: {
    firstName: user.firstName,
    lastName: user.lastName
  }
});
sdk.mount();
```

### SDK Path
- Loaded from: `../sdk/dist/index.umd.js`
- UMD bundle exposes global: `window.OnbeRebateSDK.RebateSDK`

### SDK Behavior
- Mounts into `<div id="rebate-root"></div>`
- Renders "Get Rebate" CTA button
- On click: fetches card from `http://localhost:8082/mock_server/card`
- Fallback to mock data if server unavailable
- Card styled with configured gradient colors
- Company name appears on card

## File Structure

```
sutter_health/
  index.html           # Login page (entry point)
  dashboard.html       # Payment history + refund banner
  visit.html           # Visit details + SDK integration
  shared.js            # Routing, auth, mock data, utilities
  README.md            # This file
```

## Routing

Hash-based routing:
- `#/` or no hash → Login page (`index.html`)
- `#/dashboard` → Dashboard page (`dashboard.html`)
- `#/visit/:id` → Visit details page (`visit.html`)

Navigation handled by `shared.js` functions:
- `navigate(path)` — programmatic navigation
- `getHash()` — current hash
- `getHashParams()` — parse hash parameters

## Customization

### Colors
Edit CSS variables in `<style>` blocks:
```css
:root {
  --primary: #4db6ac;
  --primary-dark: #00897b;
  --secondary: #80cbc4;
}
```

### Mock Data
Edit `MOCK_TRANSACTIONS` and `VISIT_DETAILS` in `shared.js`

### Branding
- Update `brand-text` in headers
- Replace heart icon SVG
- Modify footer text

## Browser Compatibility

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

- Form labels associated with inputs
- ARIA roles on toast notifications
- Keyboard navigation supported
- Focus outlines on interactive elements
- Sufficient color contrast (WCAG AA)

## Troubleshooting

### SDK not loading
- Ensure SDK is built: `cd frontend/sdk && npm run build`
- Check console for path errors
- Verify `frontend/sdk/dist/index.umd.js` exists

### Mock server not responding
- Ensure server is running: `cd backend/mock_server && npm start`
- Check port 8082 is not in use
- Verify CORS is enabled in server

### Toast not showing
- Check browser console for JS errors
- Ensure `shared.js` is loaded before page scripts

### Refund banner not appearing
- Check that `tx_001` has status `RefundAvailable` in mock data
- Verify `getRefundTransaction()` logic in `shared.js`

## Next Steps

- Add real authentication with backend API
- Integrate with actual card provisioning service
- Add transaction filtering and search
- Implement pagination for history
- Add export/download capabilities
- Enhance error handling and validation
- Add unit tests for utilities

## License

MIT — Demo purposes only
