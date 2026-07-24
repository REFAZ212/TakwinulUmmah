# AGENTS.md — Yayasan Takwinul Ummah

## Stack

- **Frontend** (`frontend/`): Next.js **16** (App Router) + React 19 + TypeScript + Tailwind **v4** + Framer Motion
- **Backend** (`backend/`): NestJS 10 + Prisma 5 + PostgreSQL 16
- **Infra**: `docker-compose.yml` runs only Postgres (`docker compose up -d postgres`)

## Dev commands

### Frontend (`cd frontend`)
```bash
npm install
cp .env.local.example .env.local   # or create manually: NEXT_PUBLIC_API_URL=http://localhost:4000
npm run dev          # http://localhost:3000
npm run lint         # eslint (the only quality gate — no typecheck or test scripts)
```

### Backend (`cd backend`)
```bash
cp .env.example .env
npm install
npx prisma generate          # MUST run before dev/build — Prisma Client is generated, not checked in
npx prisma migrate dev       # apply migrations
npx prisma db seed           # creates Super Admin: superadmin@takwinul-ummah.sch.id / ChangeMe!12345
npm run start:dev            # http://localhost:4000/api
```

**There is no test framework configured in either package.** No `test`, `e2e`, or `typecheck` scripts exist.

## Architecture

### Two-URL split (critical convention)
The entire system enforces a hard separation between public and admin surfaces:

| Surface | Frontend route | Backend prefix | Auth |
|---------|---------------|----------------|------|
| Public | `/`, `/smp`, `/sma`, `/news`, etc. | `/api/public/*` | None |
| Admin | `/portal-manajemen/*` | `/api/admin/*` | JWT + RBAC |

- `/portal-manajemen` is **not** in navbar/footer and is `noindex, nofollow` via header in `next.config.ts`.
- Backend modules always have two controllers: `XxxPublicController` (unguarded) + `XxxAdminController` (`JwtAuthGuard` + `RolesGuard`). See `backend/src/modules/news/` as the reference pattern for all 11 modules.
- Auth flow: login stores JWT in `sessionStorage` + cookie. `adminApi` axios instance has request interceptor that attaches `Bearer` token. `middleware.ts` guards `/portal-manajemen/*` (exempts login).

### Backend modules (`backend/src/modules/`)
`achievements`, `admissions`, `announcements`, `contact`, `downloads`, `facilities`, `gallery`, `media`, `news`, `settings`, `users`

Each follows: `dto/`, `{name}.controller.ts`, `{name}.module.ts`, `{name}.service.ts`

### RBAC roles
`SUPER_ADMIN`, `ADMIN_YAYASAN`, `ADMIN_SMP`, `ADMIN_SMA`, `EDITOR`, `GUEST` (6 total; see Prisma schema)

### Frontend structure (`frontend/app/`)
- **`(public)/`** — route group for public pages (inherits Navbar/Footer/RunningText/FloatingContact from its layout). URL paths are unchanged (`/`, `/news`, `/smp`, etc.).
- **`portal-manajemen/`** — admin portal. Layout provides sidebar + header + ToastProvider. Login page is detected and rendered without sidebar.
- **`components/ui/`** — shared admin UI primitives: `Button`, `Card`, `Badge`, `Modal`, `ConfirmModal`, `Toast/useToast`, `EmptyState`, `Skeleton*`, `SearchInput`, `Pagination`, `PageHeader`, `Select`, `Input`, `Textarea`, `ImageUpload`. **Use these for all new admin pages.**
- `components/layout/` (Navbar, Footer), `components/shared/` (GirihMotif, RunningText, etc.), `components/home/`
- `lib/api.ts` — exports `publicApi` and `adminApi` (axios instances with auth interceptor)
- `lib/constants.ts` — centralized site name, contact info, social media URLs
- `middleware.ts` — protects all `/portal-manajemen/*` routes (exempts `/portal-manajemen/login`)

### Branding
- Yayasan: **Yayasan Takwinul Ummah**
- Pesantren: **Pondok Pesantren Takwinul Ummah**
- SMP: **SMP IT Takwinul Ummah**
- SMA: **SMA IT Takwinul Ummah**

## Gotchas

- **Next.js version**: package.json has `next@16.2.11`. README says "Next.js 15" — **ignore the README**, trust the package.
- **Tailwind v4**: No `tailwind.config.js`. Uses `@import "tailwindcss"` + `@theme inline` block in `globals.css`. Custom colors (`--color-deep`, `--color-gold`, etc.) are registered as theme tokens there. If you add new design tokens, add them to both `:root` and `@theme inline`.
- **Google Fonts disabled**: `layout.tsx` has font imports commented out (sandbox limitation). Uncomment the `next/font/google` block when deploying with internet access.
- **Prisma generate required**: Backend will fail without `npx prisma generate` — the client is generated, not committed.
- **No frontend typecheck**: Only `npm run lint` (eslint) exists. Run `npx tsc --noEmit` manually if you need type verification.
- **Cloudinary optional**: Without env vars, media uploads fall back to local `/uploads` directory.
- **Backend validation**: `ValidationPipe` with `forbidNonWhitelisted: true` — unknown DTO properties cause 400 errors.
- **Path alias**: Frontend uses `@/*` → project root (`tsconfig.json` `paths`).
- **Backend modules use CommonJS** (`"module": "commonjs"` in tsconfig).
