# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## amoCRM lead capture runbook

### Required env vars
- `NEXT_PUBLIC_API_BASE` (frontend, e.g. `https://<project>.vercel.app`)
- `AMOCRM_ACCESS_TOKEN` (server, long-lived token)
- `AMOCRM_API_DOMAIN` (server, e.g. `api-b.amocrm.ru`)

### Manual test (curl)
```bash
curl -X POST "$NEXT_PUBLIC_API_BASE/api/lead" \
  -H "Content-Type: application/json" \
  -d '{"name":"Тест","phone":"+79990000000","email":"test@bio-cube.ru","message":"Ping","visitor_uid":"test-uid-123"}'
```
Expected: JSON `{ "ok": true, "leadId": <number>, "contactId": <number>, "visitor_uid": "test-uid-123" }`

### Browser checklist
- `localStorage.getItem("amo_visitor_uid")` returns value
- Network request URL is `${NEXT_PUBLIC_API_BASE}/api/lead` (not relative)
- Response `content-type` is `application/json`
- Lead appears in amoCRM and is bound to visitor (pixel)
- If `NEXT_PUBLIC_API_BASE` is unset, client throws a clear error

## Post-Submit Popup

### Overview
Unified popup that appears after successful form submission across all forms (Calculator, Installation Tariffs). The popup promotes the aquarium configurator with autoplay video and CTA buttons.

### Required env vars
- `NEXT_PUBLIC_CONFIG_URL` — URL of the configurator app (e.g., `https://bio-cube.aqua-builder.app`)
- `NEXT_PUBLIC_POPUP_VIDEO_SRC` — URL to video file (mp4/webm, optional)
- `NEXT_PUBLIC_SHOW_POPUP_ALWAYS` — Set to `'true'` to always show popup (for QA/testing)

### Features
- **Session-scoped display**: Shows once per browser session (uses `sessionStorage`)
- **Autoplay video**: Muted, playsInline, with unmute button
- **Analytics integration**: Sends events to GTM dataLayer, Yandex Metrika, VK Pixel
- **Accessibility**: Focus trap, keyboard navigation (ESC to close), ARIA labels
- **Error handling**: Falls back to static image if video fails to load
- **SSR-safe**: All `window`/`sessionStorage` access is guarded

### Integration
The popup is integrated in:
- `Calculator.tsx` — after successful `submitLead()` (source: `'calculator'`)
- `InstallationTariffsSection.tsx` — after successful form submission (source: `'tariffs'`)

Popup is **NOT** shown on API errors.

### Usage in forms
```typescript
import { openPopup } from '@/components/post-submit/postSubmitBus';

// After successful API call:
try {
  await submitLead({ ... });
  openPopup({ source: 'calculator' }); // or 'tariffs', 'contact'
} catch (error) {
  // Popup is NOT shown on error
}
```

### Analytics events
The popup sends the following events:
- `bc_popup_open` — when popup opens (includes `source` param)
- `bc_popup_video_play` — when video starts playing
- `bc_popup_go_configurator` — when user clicks primary CTA
- `bc_popup_go_species` — when user clicks "Узнать о видах рыб"
- `bc_popup_close` — when popup is closed (includes `source` and optional `reason`)

Events are sent to:
- Google Tag Manager `dataLayer`
- Yandex Metrika (if configured)
- VK Pixel (if configured)

### Testing
1. **Normal mode**: Popup shows once per session. Clear `sessionStorage` to test again.
2. **Always show mode**: Set `NEXT_PUBLIC_SHOW_POPUP_ALWAYS='true'` to bypass session check.
3. **Without video**: If `NEXT_PUBLIC_POPUP_VIDEO_SRC` is not set, shows static fallback image.
4. **Without config URL**: If `NEXT_PUBLIC_CONFIG_URL` is not set, CTA buttons are hidden.

### Files
- `src/components/post-submit/PostSubmitPopup.tsx` — Main popup component
- `src/components/post-submit/usePostSubmitPopup.ts` — React hook for popup state
- `src/components/post-submit/postSubmitBus.ts` — Event bus for cross-component communication
- `src/lib/analytics.ts` — Analytics helpers (GTM, Yandex, VK)
