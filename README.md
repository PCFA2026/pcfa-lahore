# PCFA Lahore — Pakistan-China Friendship Association

A production-ready website for the Pakistan-China Friendship Association (PCFA), Lahore.

Built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, **Supabase**, and **Resend**. Deployed on **Vercel**.

---

## Features

- **Public website** — Home, About, Leadership, Become a Member
- **Bilingual** — full English / 中文 (Chinese) toggle, all public content translated
- **Membership application form** — saves to Supabase + sends confirmation email via Resend
- **Admin panel** (`/admin`) — login, view/approve/reject applications, manage members, send newsletters
- **Responsive** — mobile, tablet, desktop
- **Secure** — service-role key server-side only, RLS on all tables, admin routes protected
testings
---

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Fill in the values (see [Environment Variables](#environment-variables) below).

### 3. Set up the database

Open your Supabase project's **SQL Editor** and run the contents of:

```
supabase/schema.sql
```

This creates the tables (`membership_applications`, `approved_members`, `newsletter_sends`) and enables Row Level Security.

### 4. Create an admin user

In Supabase → **Authentication → Users**, create a user with the email you listed in `ADMIN_EMAILS`.

### 5. Run

```bash
npm run dev
```

Visit `http://localhost:3000`.

---

## Environment Variables

| Variable | Where | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API | Anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API | Service role key (server-only) |
| `RESEND_API_KEY` | Resend → API Keys | Email API key |
| `FROM_EMAIL` | Your domain | Sender address, e.g. `PCFA Lahore <info@pcfalahore.org>` |
| `ADMIN_EMAILS` | You choose | Comma-separated admin emails |

> **Important:** `SUPABASE_SERVICE_ROLE_KEY` must never be exposed to the browser. It is only used in server API routes.

---

## Adding Photos

### Member photos

Place member photos in `public/photos/` and update the `photo` field in `src/lib/leadership.ts`:

```
public/photos/dr-khalid.jpg
public/photos/asad-gondal.jpg
public/photos/hamza-sufi.jpg
public/photos/rizwan-sherwani.jpg
public/photos/chen-meifen.jpg
public/photos/farzana-riaz.jpg
public/photos/naveed-saeed.jpg
```

Ms. Khatiqa Amir intentionally has no photo — her card shows a clean text-only profile with her name and designation only (no initials or placeholder image). If any photo file is missing, the card gracefully renders as text-only.

### Pakistan-China hero image (Home page)

The Home hero image slot uses the local path `public/images/pakistan-china.jpg`. Until the client provides the final image, a clean branded placeholder is shown automatically (no fabricated photo is used).

### Faculty members

The Faculty page publicly shows the 8 members listed in the `leaders` array in `src/lib/leadership.ts` (7 with photo slots, 1 text-only).

---

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, **Add New Project** → import the repository.
3. Set the **Environment Variables** (same as `.env.example`) in Vercel → Settings → Environment Variables.
4. Deploy.

Vercel automatically detects Next.js and builds with `npm run build`.

---

## Project Structure

```
src/
  app/
    page.tsx                  # Home
    about/page.tsx            # About
    leadership/page.tsx       # Leadership / EC members
    membership/page.tsx       # Membership application form
    admin/page.tsx            # Admin login + dashboard
    api/
      membership/route.ts     # Submit application
      admin/
        applications/route.ts # List applications
        applications/[id]     # Approve / reject
        members/route.ts      # List approved members
        newsletter/route.ts   # Send newsletter
  components/
    Navbar.tsx, Footer.tsx, SectionHeading.tsx, MemberCard.tsx
  lib/
    i18n.tsx                  # Language provider + hook
    dictionary.ts, lang-en.ts, lang-zh.ts  # Translations
    supabase.ts               # Browser + service clients
    server-auth.ts            # Admin auth verification
    admin.ts                  # Admin helpers
    emails.ts                 # Resend email templates
    leadership.ts             # EC member data
    types.ts                  # TypeScript types
supabase/schema.sql           # Database schema + RLS
```

---

## Email Flows

1. **Application confirmation** — sent to applicant when they submit the form.
2. **Approval / welcome** — sent when an admin approves an application.
3. **Newsletter** — sent to all approved members from the admin panel.

<!-- deployment -->
