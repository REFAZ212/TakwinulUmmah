# Yayasan Takwinul Ummah — Full Stack Website

Website Yayasan (Pondok Pesantren + SMP IT + SMA IT) dengan CMS terpadu.
Homepage utama = Pondok Pesantren; SMP IT dan SMA IT adalah halaman anak yang
diakses dari navigasi utama.

## Struktur Proyek

```
frontend/    → Next.js 16 (App Router) + TypeScript + Tailwind v4
backend/     → NestJS + Prisma + PostgreSQL
docker-compose.yml
```

## Dua URL Terpisah

| Area | URL Frontend | URL API |
|---|---|---|
| **Publik** (tanpa login) | `/` , `/smp`, `/sma`, `/news`, dst | `/api/public/*` |
| **Privat Admin** (wajib login) | `/portal-manajemen/login` | `/api/admin/*` |

- `/portal-manajemen/*` **tidak** muncul di navbar/footer publik, dan diberi
  header `X-Robots-Tag: noindex, nofollow` (lihat `frontend/next.config.ts`).
- Backend memisahkan controller: setiap modul punya `XxxPublicController`
  (tanpa guard) dan `XxxAdminController` (wajib `JwtAuthGuard` + `RolesGuard`).
  Lihat `backend/src/modules/news/` sebagai contoh pola.

## Menjalankan Secara Lokal

### 1. Database (via Docker)
```bash
docker compose up -d postgres
```

### 2. Backend
```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run start:dev         # http://localhost:4000/api
```

Akun Super Admin awal:
```
Email    : superadmin@takwinul-ummah.sch.id
Password : ChangeMe!12345
```

### 3. Frontend
```bash
cd frontend
cp .env.local.example .env.local   # isi NEXT_PUBLIC_API_URL=http://localhost:4000
npm install
npm run dev                # http://localhost:3000
```

## Halaman Publik

| Rute | Deskripsi |
|------|-----------|
| `/` | Homepage (Hero, QuickNav, About, Stats, News, Testimoni, Lokasi) |
| `/about` | Profil yayasan, sejarah, visi-misi, dewan pembina |
| `/smp` | SMP IT Takwinul Ummah — visi, guru, fasilitas, ekstrakurikuler |
| `/sma` | SMA IT Takwinul Ummah — jurusan, program unggulan, fasilitas |
| `/news` | Berita & kegiatan |
| `/announcements` | Pengumuman resmi |
| `/achievements` | Prestasi santri |
| `/gallery` | Galeri foto |
| `/facilities` | Fasilitas seluruh unit |
| `/admissions` | Pendaftaran santri baru (form dengan validasi) |
| `/downloads` | Pusat unduhan dokumen |
| `/contact` | Formulir kontak + peta lokasi |

## Social Media

Footer dan halaman utama menampilkan tautan ke:
- YouTube: `@takwinulummah`
- Instagram: `@takwinulummah`
- TikTok: `@takwinulummah`
- Facebook: `takwinulummah`

Konstanta terpusat di `frontend/lib/constants.ts`.

## Catatan Deploy Produksi

1. **Google Fonts**: uncomment blok `next/font/google` di `layout.tsx`.
2. **Prisma generate**: jalankan `npx prisma generate` sebelum build.
3. Ganti semua secret di `.env` sebelum go-live.
4. Cloudinary opsional — tanpa env vars, upload fallback ke `/uploads`.
5. `middleware.ts` melindungi `/portal-manajemen/dashboard/*` — token
   disimpan di sessionStorage + cookie oleh halaman login.
