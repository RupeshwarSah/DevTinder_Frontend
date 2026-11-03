# DevTinder — your frontend development guide

This is the living guide to the frontend in C:\node\devTinder_web. It records the initial setup and later UI changes. Update the relevant sections and append to the Updates Log whenever the project changes.

## 1. Setup from scratch

The destination folder was inspected and was empty. The official React JavaScript template was created directly in that folder; no client/frontend directory was added.

Commands actually used:

```bash
npm create vite@latest . -- --template react
npm install
npm install tailwindcss @tailwindcss/vite react-router
npm install -D daisyui
```

The dot means “use this directory.” Node.js 24.20.0 and npm 12.2.0 were available. Installed Vite 8.3.5 requires Node ^20.19.0 or >=22.12.0, so this Node version is compatible. The first sandboxed npm attempt stalled; the official scaffold and installs succeeded with approved network access.

The generated Vite demo was replaced with DevTinder pages. Unused App.css, demo images, and icons were removed after inspection. A local favicon, page title, description, and README were added. Existing backend code was not involved.

### Everyday commands

Run these from the project root:

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

- install installs dependencies; package-lock.json records resolved versions.
- dev starts Vite with hot reload.
- build produces production files in dist/.
- lint checks JavaScript/JSX with Oxlint.
- preview serves an existing production build locally; run build first.

For the initial browser checks, the command was:

```bash
npm run dev -- --host 127.0.0.1
```

The browser-accessible server selected port 5174 because 5173 was occupied. Use the URL printed by Vite; the port is not guaranteed. No packages were added for the navbar/theme update.

## 2. Packages

Resolved versions at initial installation:

| Package | Version | Why it is here |
| --- | --- | --- |
| react | 19.3.1 | Functional components, JSX rendering model, local UI state |
| react-dom | 19.3.1 | Mounts React in the browser |
| vite | 8.3.5 | Development server and production bundler |
| @vitejs/plugin-react | 6.1.2 | React integration and development refresh |
| tailwindcss | 4.3.3 | Layout, spacing, typography, responsive utilities |
| @tailwindcss/vite | 4.3.3 | Compiles Tailwind through Vite |
| daisyui | 5.7.50 | Theme-aware navbar, footer, buttons, cards, forms, theme controller |
| react-router | 8.5.1 | Declarative client-side routing |
| oxlint | 1.90.0 | Checks source for common problems |
| @types/react / @types/react-dom | 19.3.0 | Template-provided editor type information; application code remains JavaScript/JSX |

package.json uses compatible version ranges. package-lock.json records the exact dependency tree. Use npm list --depth=0 to inspect installed versions later.

## 3. Folder structure

```text
C:\node\devTinder_web/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── Footer.jsx
│   ├── layouts/
│   │   └── Body.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Profile.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
└── foryou.md
```

node_modules/ contains installed packages. dist/ contains generated build output. Both are ignored by Git.

## 4. Routing

main.jsx imports the stylesheet and mounts App inside React StrictMode. It does not create a router.

App.jsx owns the single BrowserRouter and the complete Routes tree. Keeping the router here follows this project's requested architecture and makes the routing entry point easy to find.

```text
BrowserRouter
└── Routes
    └── / → Body
        ├── index → Home
        ├── login → Login
        ├── signup → Signup
        ├── profile → Profile
        └── * → NotFound
```

BrowserRouter uses the browser history API to navigate without full-page reloads. Link provides internal navigation. NavLink additionally supplies active-route information, used to apply daisyUI's menu-active class. The Home link uses end so it is not marked active on every child URL.

Body.jsx renders Navbar, a semantic main containing Outlet, and Footer. Outlet is the place where React Router inserts the matching child page. For example, /login matches Body plus Login, and Login appears inside main. The index child renders at /. The wildcard child handles unknown URLs.

Navbar and Footer belong to Body, not individual pages, so they remain shared as child routes change. Body uses a full-viewport flex column and a growing main area to keep the footer down on short pages.

On production hosting, configure a fallback to index.html for app URLs so refreshing /profile works. That is a hosting requirement, not another React route.

## 5. Styling

### Tailwind CSS v4

vite.config.js imports both react and tailwindcss, then enables both:

```js
plugins: [react(), tailwindcss()]
```

src/index.css starts with:

```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: light --default, dark;
}
```

No legacy tailwind.config.js or v3 @tailwind directives are needed for this setup.

Tailwind utilities provide spacing and layout: max-w-6xl centers content within a readable width when combined with mx-auto, flex-1 consumes remaining flex space, and lg: applies a utility at the large-screen breakpoint.

### daisyUI

daisyUI supplies component classes such as navbar, menu, btn, card, input, select, footer, and theme-controller. Tailwind supplements their layout without replacing their styling.

Theme tokens such as bg-base-100, bg-base-200, text-base-content, and btn-accent adapt to the selected theme. Prefer those tokens to hardcoded page colors if you want components to work in both themes.

### Light/dark switch

ThemeToggle.jsx follows the official theme-controller checkbox and swap pattern:

- The checkbox has class theme-controller and value dark.
- Checked means dark; unchecked falls back to the configured light default.
- daisyUI CSS changes the theme across the document. We do not implement a second palette, custom dark-mode CSS, or an authentication/context system.
- swap-on and swap-off display the moon/sun icons according to checkbox state.
- The checkbox has the accessible name “Dark theme” and supports keyboard input.
- React useState initializes from localStorage key devtinder-theme.
- The change handler saves light or dark. Storage errors are caught, so switching still works for the current mounted app if storage is blocked.
- The shared Navbar stays mounted during nested navigation, retaining the selection. On reload, the initializer restores it.
- Light is the explicit default; this version does not automatically follow OS dark mode.
- Persistence begins when React mounts. No pre-render theme bootstrap or cross-tab synchronization was added.

The official controller uses modern CSS :has() support; consult its documentation when targeting older browsers.

## 6. Components and file responsibilities

| File | Responsibility and UI pattern |
| --- | --- |
| main.jsx | Mount React and load the global stylesheet |
| App.jsx | Single BrowserRouter and nested declarative routes |
| layouts/Body.jsx | Shared semantic layout, skip link, growing main, Outlet |
| components/Navbar.jsx | Branding, responsive dropdown, active NavLinks, Get started, ThemeToggle |
| components/ThemeToggle.jsx | daisyUI checkbox/swap UI and small localStorage persistence handler |
| components/Footer.jsx | Official footer/footer-center structure, branding, internal links, runtime year |
| pages/Home.jsx | Original DevTinder landing composition using daisyUI cards/buttons and a responsive Tailwind grid |
| pages/Login.jsx | Labeled email/password preview form, native validation, local submission message |
| pages/Signup.jsx | Labeled name/email/password/age/gender preview form |
| pages/Profile.jsx | Clearly labeled future profile placeholder without invented user details |
| pages/NotFound.jsx | Friendly 404 and Home link |
| index.css | Tailwind import and daisyUI theme configuration |
| vite.config.js | React and Tailwind build plugins |
| index.html | Root mount element, metadata, local favicon |
| README.md | Short run instructions and project overview |
| foryou.md | Detailed learning guide and ongoing update history |

Login and Signup prevent default form submission. They make no API requests, save no form details, and show no false login/account success. Authentication, protected routes, Axios, Redux, cookies, JWT, sockets, and backend changes remain outside the current scope.

## 7. Navbar refinement history

The original desktop navbar placed links in navbar-center between two half-width sections. This made the navigation feel centered.

The updated structure uses:

- Initially, a centered max-w-6xl navbar with horizontal padding; the later enhancement below widens it independently of page content.
- navbar-start with w-auto and flex-1 for the left group: branding and theme toggle (plus the mobile dropdown).
- navbar-end with w-auto from the small breakpoint upward for the right group: desktop links and Get started.
- No empty navbar-center: daisyUI does not require all three sections.
- lg:flex for the desktop menu; the existing details/summary dropdown remains below that breakpoint.
- A wrapping layout below sm: the CTA occupies a right-aligned second row so the branding, toggle, and hamburger are not squeezed on narrow phones.
- Existing Escape-to-close behavior and close-on-navigation behavior are preserved.

The task's detailed layout instructions and verification list disagreed about toggle/CTA positions. This implementation follows the detailed layout section: theme toggle left, Get started right.

Files changed for this update: Navbar.jsx, index.css, README.md.
Files created: ThemeToggle.jsx, foryou.md.
Routing, page contents (including existing Home edits), Body, and Footer were preserved.

## 8. UI sources and useful references

These are references for structures and APIs, not a claim that the entire landing design was copied from an official example.

| Official reference | Why to use it |
| --- | --- |
| https://vite.dev/guide/ | Official React scaffold, prerequisites, development/build workflow |
| https://tailwindcss.com/docs/installation/using-vite | Current Tailwind v4 Vite plugin integration |
| https://tailwindcss.com/docs/ | Search utilities for spacing, layout, typography, responsive behavior |
| https://tailwindcss.com/docs/responsive-design | Understand breakpoint prefixes such as sm: and lg: |
| https://daisyui.com/docs/install/vite/ | CSS plugin installation compatible with this project |
| https://daisyui.com/components/ | Component catalogue for future UI work |
| https://daisyui.com/components/navbar/ | Official navbar sections and responsive menu structures |
| https://daisyui.com/components/dropdown/ | details/summary dropdown behavior and markup |
| https://daisyui.com/components/footer/ | Footer structure and alignment modifiers |
| https://daisyui.com/components/card/ | card/card-body patterns used throughout the pages |
| https://daisyui.com/components/button/ | Button variants and sizes |
| https://daisyui.com/components/input/ | Input appearance |
| https://daisyui.com/components/select/ | Select appearance |
| https://daisyui.com/components/fieldset/ | Form grouping and label patterns |
| https://daisyui.com/docs/themes/ | Enable built-in themes and choose defaults |
| https://daisyui.com/components/theme-controller/ | CSS-driven theme selection and optional JS persistence |
| https://daisyui.com/components/swap/ | Checkbox-controlled icon presentation |
| https://reactrouter.com/start/declarative/installation | Install react-router for Declarative Mode |
| https://reactrouter.com/start/declarative/routing | Routes, index routes, nested layouts, Outlet |
| https://react.dev/learn | Components, props, rendering, and state fundamentals |

The initial setup consulted the Vite, Tailwind installation, daisyUI installation/navbar/footer, and React Router installation/routing pages. The current update consulted daisyUI themes, theme-controller, and navbar documentation. The other links above are further reading for the patterns in this app.

## 9. Where should I go to design more components?

1. Start at the daisyUI component catalogue. Pick the closest component, such as a card, modal, or dropdown.
2. Read the class table and inspect the example markup. Keep the required component structure before changing layout.
3. Convert HTML examples to JSX: use className instead of class, htmlFor instead of for, and close input/SVG tags properly.
4. Use Tailwind utilities for spacing, width, grids, and responsive breakpoints. Search the Tailwind docs when unsure what a class does.
5. Use daisyUI semantic colors so the component works in light and dark themes.
6. Put reusable UI in src/components. Put full route screens in src/pages.
7. For a new page, import it in App.jsx and add a child Route under Body. Use Link/NavLink for internal navigation. Do not add another BrowserRouter.
8. Check visible labels, keyboard focus, mobile layout, and both themes. Then run lint and build.
9. Record the changed files, official references, and actual checks below.

## 10. Verification record

### Initial setup

- npm installation succeeded.
- Production build and lint passed after fixing the footer year calculation warning.
- Browser checks covered Home, Login, Signup, Profile, wildcard 404, and Navbar navigation.
- Empty forms were blocked by native validation; valid preview submissions stayed on the same route.
- Shared header, footer, and main counts were each one.
- Desktop styling and mobile menu behavior were checked; Enter opened and Escape closed the mobile menu.
- No backend or production deployment was tested.

### Navbar/theme update

- npm run build passed.
- npm run lint passed.
- Imports were checked by the build; existing nested routes and Outlet structure were inspected and left unchanged.
- Browser verification was attempted, but the browser tool could not access the existing preview (“browser.user is unavailable”).
- Desktop/mobile appearance, interactive theme changes, reload persistence, and navigation after this update still require a browser check. Do not treat the earlier version's browser results as verification of this version.

Manual check: start the dev server, inspect desktop and narrow/mobile layouts, activate the Dark theme checkbox, visit every route, reload, switch back to light, and test dropdown keyboard controls.

## 11. Updates Log

### 2026-11-01 — Initial frontend foundation

Created the official Vite React JavaScript app in the existing workspace. Installed Tailwind, daisyUI, and React Router. Added nested routes, shared layout, responsive navigation/footer, landing page, preview forms, profile placeholder, and 404. Build, lint, and browser checks completed.

### 2026-11-01 — Navbar alignment and themes

Moved desktop links beside Get started on the right. Kept branding and the new daisyUI theme controller on the left. Enabled light/dark themes and localStorage persistence. Preserved mobile dropdown and added narrow-screen wrapping. Added this guide and refreshed README. Build and lint passed; browser checks are pending because the browser tool failed.

### 2026-11-01 — Wider desktop navbar and guest avatar

The earlier navbar still shared the relatively narrow page container, so its brand felt too centered on a wide desktop. Navbar.jsx now uses max-w-screen-2xl (96rem / 1536px), with 16px mobile padding and 32px desktop padding. The page content keeps its original width. This moves the logo further left and keeps the action group toward the right without absolute positioning.

The theme button remains immediately after the brand. The hamburger is hidden at the lg breakpoint (1024px and above); below it, the native details/summary menu remains available. Desktop links, Get started, and the new guest avatar are grouped in navbar-end. On narrow phones, Get started and the avatar use the second row to avoid squeezing the brand and theme controller.

Added a daisyUI avatar-placeholder with the initial G for Guest, rather than pretending an authenticated user exists. Its dropdown contains a working Profile link and disabled Settings / Logout placeholders with explanatory labels. No external photo or auth integration was added.

Both dropdowns share readable closeDropdown and dismissWithEscape helpers. Escape closes and returns focus to the summary; choosing a link closes its dropdown. Matching details name attributes let supporting browsers keep only one navbar dropdown open.

Files modified: src/components/Navbar.jsx and foryou.md. No packages added. App.jsx, Body.jsx, pages, theme-controller behavior, and persistence were preserved.

Official references consulted for this enhancement:
- Navbar structure: https://daisyui.com/components/navbar/
- Native details dropdown and end alignment: https://daisyui.com/components/dropdown/
- Placeholder avatar: https://daisyui.com/components/avatar/
- Ghost/circle and action buttons: https://daisyui.com/components/button/
- Existing theme controller: https://daisyui.com/components/theme-controller/
- Existing theme setup: https://daisyui.com/docs/themes/

Verification performed:
- Production build and lint passed.
- Browser access recovered after resetting the browser tool session.
- At 1440px, inspected the rendered desktop navbar: no hamburger, brand/theme on left, links/CTA/avatar on right. The left group begins at 32px.
- Opened guest dropdown and followed Profile; the expected nested page rendered and dropdown closed.
- Enabled dark theme, observed dark page colors, reloaded, and confirmed the checkbox remained selected.
- At 375px, opened the mobile menu, dismissed with Escape, switched back to light, and observed light colors.
- No horizontal overflow at the tested desktop/mobile widths. Header and footer each appeared once.
- Other routes were preserved in source; Login, Signup, and 404 were not individually retested during this enhancement. Broader cross-browser and all-width coverage remain unverified.

### Template for the next update

- Date and short title:
- What changed and why:
- Files created/modified:
- Packages added/changed (or none):
- Official references used:
- Checks actually performed:
- Known limitations / next steps:


### 2026-11-03 — Authenticated feed and profile card

The existing protected /feed route now loads the first page of developer profiles. In src/components/Feed.jsx, useEffect starts the Axios GET request to BASE_URL + "user/feed" with page 1, limit 10 and withCredentials enabled. The browser sends the existing login cookie. Cleanup aborts the request if the component unmounts. useState holds the response array and error flag. A null array means loading, an empty array shows the empty-feed message, and a failed request shows an alert.

The endpoint returns an object with a data array, so Axios exposes the profiles at response.data.data. Feed passes users[0] to the new src/components/userCard.jsx as the user prop. Keeping the request in Feed lets UserCard concentrate on rendering one profile. Its figure uses photoUrl and a name-based alt label. The card body shows firstName, lastName, age, gender and about. Ignore and Send Connection are visual buttons only.

The flex and justify-center utilities center the card within the existing layout. w-full and max-w-96 let it shrink on small screens. Semantic daisyUI colors follow the current theme. The layout and routing still come from Body and App.

Backend changes: src/models/user.js adds the supplied profile image URL with HTTP(S) URL validation and the default about text. Age defaults to 21 and gender defaults to male. In src/routes/user.js, the feed projection now includes about and photoUrl. Filtering and pagination continue to use the existing route logic.

The development reset used a verified encrypted backup outside both projects. Seven identities were recreated through signup and login, and three accepted relationships were replayed by their senders and receivers against the new IDs. Temporary test credentials and the identity mapping are encrypted outside Git.

References: [daisyUI Card](https://daisyui.com/components/card/), [daisyUI Button](https://daisyui.com/components/button/), [Tailwind utilities](https://tailwindcss.com/docs/), [React useEffect](https://react.dev/reference/react/useEffect), [React useState](https://react.dev/reference/react/useState).

Checks run: npm run build, npm run lint, authenticated local HTTP requests through Invoke-RestMethod, a temporary Node/Playwright browser check, and curl.exe against the supplied image URL. Verified database identity/reference integrity, safe feed fields, login, a single centered card, mobile width at 375px, theme switching, logout and the guest redirect. The supplied JPEG returned HTTP 200 and decoded in Chrome. Lint reported three existing warnings in Body.jsx and userSlice.js.

### 2026-11-03 — Feed and login styling

The Ignore button uses a deep pink background and white text in both themes. A failed login now shows a compact error alert with an icon directly above Login. See the official daisyUI [Button](https://daisyui.com/components/button/) and [Alert](https://daisyui.com/components/alert/) patterns.

### 2026-11-03 — Edit Profile and live preview

The existing Profile page renders EditProfile so the route stays simple. EditProfile reads the signed-in account with useSelector(store => store.user). Once the account is available, the form initializes its own useState draft. The fields hold strings while you type. The derived profile trims the names, converts the age to a number, and uses the default avatar for an empty photo URL.

Each edit passes a new user prop to UserCard, so the preview updates immediately. The isPreview prop disables both connection buttons and labels them as preview actions. Keeping the draft local prevents unfinished edits from changing the account shown elsewhere. Reloading restores the saved profile.

Save Profile runs frontend validation and shows a compact error alert above the button when a field needs attention. A valid submission displays “Profile Edited successfully” in a success toast for three seconds. Repeated submissions restart the timer, and leaving the page clears it. Saving currently demonstrates feedback only. Persistence and Redux updates belong to a later authenticated PATCH integration.

Official daisyUI patterns used: [Card](https://daisyui.com/components/card/), [Input](https://daisyui.com/components/input/), [Select](https://daisyui.com/components/select/), [Textarea](https://daisyui.com/components/textarea/), [Button](https://daisyui.com/components/button/), [Alert](https://daisyui.com/components/alert/), and [Toast](https://daisyui.com/components/toast/).

### 2026-11-03 — Simplified profile editor

Profile reads the signed-in Redux user, handles loading, and passes the account to EditProfile as a prop. EditProfile keeps the six editable values in local useState and passes that draft straight to UserCard. This gives an immediate preview while the saved Redux account keeps its original values. UserCard owns the existing preview image fallback.

The custom validator was removed because the PATCH API will enforce profile rules. The form keeps its native HTML constraints. For now, submitting clears the error and shows the simulated success toast for three seconds. Later, the Axios error handler can call setError with the backend message. A truthy error currently shows “Error goes here” above Save Profile.
