## Quick context for AI assistants (Event Décor Bazaar)

Be concise and actionable. This repository is an Expo React Native app (mix of JS/TSX). Key goals: marketplace of décor setups, 3D/AR previews (via WebView + <model-viewer>), budget planner, vendor workflows, and simple mock payments.

Important files & folders
- `App.js` — current entry using React Navigation stack (see how screens are registered).
- `app/` — contains additional routing/layout files created by the starter; treat carefully if you change entrypoints (project previously used `expo-router`).
- `screens/` — primary app screens (HomeScreen, ProductsScreen, BudgetPlanner.js, etc.). Use these when adding UI features.
- `components/` — reusable UI pieces (themed-text, themed-view, parallax-scroll-view). Prefer updating or adding new components here.
- `assets/images/` — static images; prefer storing uploaded assets in Firebase Storage for production.
- `hooks/` and `constants/` — small utilities and theme constants. Follow existing themed component patterns (`use-theme-color`, `themed-*`).

Dev & build commands (copy from `package.json`)
- Install: `npm install`
- Start dev server: `npm start`  (runs `expo start`)
- Open Android: `npm run android`
- Open iOS: `npm run ios`
- Web: `npm run web`
- Lint: `npm run lint`
- Reset starter project: `npm run reset-project`

Project-specific patterns and conventions
- Files may be JS or TSX. There is a `tsconfig.json` but not all files are TypeScript — follow existing file style when editing.
- UI theming: use `components/themed-*` and `hooks/use-theme-color` rather than hard-coded colors.
- Navigation: `App.js` uses `createNativeStackNavigator`. If you add deep linking or file-based routing, check `app/` and avoid conflicting entrypoints.
- 3D/AR preview: use `react-native-webview` to load a minimal HTML page containing the `<model-viewer>` element. Put a reusable wrapper in `components/ModelViewerWebView.(js|tsx)` and reuse across `screens/ProductDetails*`.
  - Example pattern: WebView passes a `modelUrl` prop and HTML injects a `<model-viewer src="${modelUrl}" ar ...>` block.
- Firebase: `firebase` is a dependency. Add project config in `config/firebase.js` (do NOT commit real credentials). Use Firestore for product/vendor data, Storage for images/models, and Auth for vendor/user accounts.

Data & network conventions
- Use Firestore collections: `products`, `vendors`, `bookings`, `plans` for budgets, `reviews` for vendor ratings. Keep document IDs consistent and store vendor references as `{ id, name }` objects.
- Images: prefer signed URLs from Firebase Storage; use `expo-image` or `Image` with caching where possible.

3rd-party integration notes
- Payments: mock flows for now. Implement a `services/payments.js` with a clear interface (createPaymentIntent, confirmPayment) so real providers (Stripe/Razorpay) can be swapped later.
- AR: prefer `<model-viewer>` inside WebView for cross-platform AR preview. For advanced interactions use `expo-three` only if performance testing justifies native builds.
- Notifications: use `expo-notifications` for push; store expo push tokens on `users` documents.

What AI assistants should do (short checklist)
- Prefer small, focused edits and run `npm start` locally to verify UI changes.
- When changing navigation or entrypoints, verify `App.js` + any `app/` router files remain consistent.
- Add new screens under `screens/` and register them in `App.js` (or follow file-based routing if project converts to `expo-router`).
- When adding Firebase access, create a `config/firebase.example.js` and ask the user to copy real keys into `config/firebase.js`.
- For AR/WebView work, add `components/ModelViewerWebView` and an example usage in `screens/ProductDetailsScreen.js`.

If you need clarification
- Ask where to put Firebase credentials, which payment provider to stub, and whether AR should be implemented via WebView-only (recommended for MVP).

Notes
- Keep changes incremental. This repo mixes starter `expo-router` structure and a manual `App.js` entry — do not remove `App.js` without coordination.
- Reference `package.json` scripts when suggesting commands.

End of instructions — ask the maintainer for any missing secrets or provider choices before implementing server-side integrations.
