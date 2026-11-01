# DevTinder frontend

React + Vite, JavaScript/JSX, Tailwind CSS v4, daisyUI v5, and React Router declarative routing.

## Run
Use Node.js 24 LTS (tested with 24.20.0) and npm.

- npm install
- npm run dev
- npm run build
- npm run preview
- npm run lint

## Structure
src/App.jsx owns the single BrowserRouter and nested Routes.
src/layouts/Body.jsx shares Navbar, a main element with Outlet, and Footer.
src/pages contains Home, Login, Signup, Profile, and NotFound.
src/index.css initializes Tailwind and the daisyUI light/dark themes. ThemeToggle.jsx uses the official theme-controller and remembers the selection in localStorage.
vite.config.js enables both the React and Tailwind Vite plugins.

Routes: /, /login, /signup, /profile, and a wildcard 404.
Login and signup are UI previews: native validation and preventDefault keep submissions local. No data is sent or persisted. Profile contains no fake user data.

Production hosting must rewrite unknown paths to index.html for BrowserRouter deep links.
Backend integration and authentication are intentionally deferred.

See [foryou.md](./foryou.md) for setup history, component references, routing explanations, and the update log.
