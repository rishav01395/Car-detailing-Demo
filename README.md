# Elite Auto Detailing

A premium car detailing website built with React, TypeScript, Vite, Tailwind CSS, and Supabase-ready configuration.

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

## Supabase setup

1. Create a Supabase project.
2. Copy the project URL and anon key into `.env`.
3. Create the required tables using the SQL in `supabase/schema.sql`.
4. Enable email auth and create the first owner account via Supabase Auth.

## Production build

```bash
npm run build
npm run preview
```

## Deployment

Deploy the built app to Vercel using the standard Vite setup. Add the same environment variables in Vercel project settings.

## Notes

- Public pages work without configured database credentials.
- Owner login and admin features require valid Supabase environment variables.
- Booking and contact form submissions are stored locally in the browser until a real backend integration is configured.
