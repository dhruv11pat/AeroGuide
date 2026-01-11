# AeroGuide

AeroGuide is a comprehensive platform for finding and managing flight schools. This repository consists of three main components:

- **aeroguide-app**: The public-facing frontend for students to search and view flight schools (React + Vite).
- **aeroguide-admin**: The administrative portal for managing schools, reviews, and inquiries (Next.js).
- **aeroguide-api**: The backend API service powering both applications (Next.js + Supabase).

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Local/Vercel                             │
├─────────────────┬───────────────────┬───────────────────────────┤
│  aeroguide-app  │   aeroguide-api   │     aeroguide-admin       │
│   (Frontend)    │   (API Backend)   │    (Admin Portal)         │
│   React + Vite  │    Next.js API    │      Next.js App          │
│   Port: 5173    │     Port: 3001    │       Port: 3002          │
└────────┬────────┴─────────┬─────────┴────────────┬──────────────┘
         │                  │                      │
         │                  ▼                      │
         │         ┌───────────────┐               │
         └────────►│   Supabase    │◄──────────────┘
                   │  (PostgreSQL) │
                   │  Auth + RLS   │
                   └───────────────┘
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account
- A Google Cloud Console account (for OAuth)

## Getting Started

### 1. Supabase Setup for Team Members

**IMPORTANT: Do NOT create new tables or run seed scripts. Do NOT delete any existing resources.**
The database is already set up and populated with data. As a team member, you simply need to connect to the existing project.

1.  Log in to the [Supabase Dashboard](https://supabase.com/dashboard).
2.  Open the shared **AeroGuide** project from the organization.
3.  Go to **Settings > API**.
4.  Copy the following keys for your environment files:
    -   `SUPABASE_URL`
    -   `SUPABASE_ANON_KEY`
    -   `SUPABASE_SERVICE_ROLE_KEY`

### 2. Google OAuth Setup for Team Members

The Google Cloud project is already configured.

1.  Log in to the [Google Cloud Console](https://console.cloud.google.com).
2.  Select the **AeroGuide** project.
3.  Navigate to **APIs & Services > Credentials**.
4.  Locate the **OAuth 2.0 Client ID** for the web application.
5.  Copy the **Client ID** for your environment files.
6.  *Note:* The standard development ports (`5173`, `3001`, `3002`) are already authorized. If you use different ports, you must add them to "Authorized JavaScript origins".

### 3. Environment Configuration

**CRITICAL WARNING: NEVER commit your `.env` files to version control.**

You need to create environment files for each service using the credentials obtained above.

#### Backend API (`aeroguide-api/.env.dev`)
Create a file named `.env.dev` in the `aeroguide-api` folder:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# JWT Configuration (Generate a secure random string)
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
JWT_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id

# CORS (Allow both frontend and admin portal)
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3002
```

#### Admin Portal (`aeroguide-admin/.env.dev`)
Create a file named `.env.dev` in the `aeroguide-admin` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

#### Frontend App (`aeroguide-app/.env`)
Create a file named `.env` in the `aeroguide-app` folder:

```env
VITE_API_URL=http://localhost:3001
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### 4. Installation & Running Locally

Open three separate terminal windows to run the services simultaneously.

**Terminal 1: Backend API**

```bash
cd aeroguide-api
npm install
npm run dev
# Server will start on http://localhost:3001
```

**Terminal 2: Admin Portal**

```bash
cd aeroguide-admin
npm install
npm run dev
# Server will start on http://localhost:3002
```

**Terminal 3: Frontend App**

```bash
cd aeroguide-app
npm install
npm run dev
# Server will start on http://localhost:5173
```

## Common Errors & Troubleshooting

### CORS Errors
**Error:** `Access to fetch has been blocked by CORS policy...`
**Fix:**
1.  Ensure the backend is running.
2.  Check `aeroguide-api/.env.dev` and make sure `ALLOWED_ORIGINS` includes the URL of the app you are trying to use (e.g., `http://localhost:3002` for admin).
3.  **Restart the backend** after changing `.env.dev`. Environment variables are loaded on startup.

### Authentication Errors
**Error:** `Invalid Google token` or login failures.
**Fix:**
1.  Verify the `GOOGLE_CLIENT_ID` in your `.env` files matches exactly what is in Google Cloud Console.
2.  Ensure `http://localhost:5173` (or 3002) is listed in "Authorized JavaScript origins" in Google Cloud Console.
3.  If using Incognito/Private windows, 3rd-party cookies settings might block the Google One Tap/Pop-up.

### Database Connection Issues
**Error:** 500 errors when fetching schools.
**Fix:**
1.  Check your `NEXT_PUBLIC_SUPABASE_URL` and keys in `aeroguide-api/.env.dev`.
2.  Ensure you have run the `schema.sql` in the Supabase SQL editor.
3.  Check the API terminal logs for specific error messages.

### "Undefined" in API URL
**Error:** Requests like `/api/requests?status=undefined`.
**Fix:**
This usually happens when optional parameters are passed as `undefined` in the frontend code. The API helper functions in `aeroguide-admin/src/lib/api.ts` have been updated to filter out undefined keys before making the request. Ensure you have the latest code.
