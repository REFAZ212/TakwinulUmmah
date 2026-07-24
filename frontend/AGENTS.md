See `../AGENTS.md` for full repo guidance (stack, commands, architecture, gotchas).

Key frontend-specific notes:
- This is Next.js **16** (not 14/15) — APIs and conventions may differ from your training data.
- Tailwind **v4** — no `tailwind.config.js`; theme tokens live in `app/globals.css` via `@theme inline`.
- No typecheck or test scripts; only `npm run lint` (eslint) is available.
- **Route groups**: Public pages are in `(public)/` (includes Navbar/Footer). Admin pages are in `portal-manajemen/` (includes sidebar). Never import shared components between these surfaces.
- **Admin UI components**: Always use `components/ui/` (Button, Card, Badge, Modal, Toast, etc.) for new admin pages. Never create inline buttons/cards.
