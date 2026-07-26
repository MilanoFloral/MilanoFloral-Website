# MilanoFloral Website

A production-ready luxury wedding and events website built with **Next.js 15**, **Tailwind CSS 4**, **shadcn/ui conventions**, **Framer Motion**, **Supabase**, **Cloudinary**, **Resend**, and **Vercel**.

## Included

- Responsive Home, About, Services, Portfolio, Packages, and Contact pages
- Smooth viewport animations and hero parallax with Framer Motion
- Tailwind CSS 4 design system with soft beige, blush, and charcoal brand styling
- Accessible shadcn-style Button, Input, Textarea, Badge, and Card components
- Supabase-backed enquiry and newsletter storage
- Cloudinary signed-upload API route and Cloudinary-ready portfolio schema
- Resend email notifications for new enquiries
- SEO metadata, Open Graph image, sitemap, robots.txt, manifest, and custom 404 page
- Vercel configuration and environment template
- Graceful demo mode when external credentials are not yet configured

## 1. Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 2. Environment variables

Copy the template:

```bash
cp .env.example .env.local
```

Fill in the required values.

### Supabase

1. Create a Supabase project.
2. Open the SQL Editor and run `supabase/schema.sql`.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`.
4. Keep the service role key server-side. Never rename it with a `NEXT_PUBLIC_` prefix.

### Resend

1. Create a Resend account and verify your sending domain.
2. Add `RESEND_API_KEY`.
3. Set `RESEND_FROM_EMAIL` to an address on the verified domain.
4. Set `RESEND_TO_EMAIL` to the inbox that should receive website enquiries.

For initial testing, Resend's onboarding sender can be used within the restrictions of the Resend test environment.

### Cloudinary

1. Create a Cloudinary product environment.
2. Add the cloud name, API key, and API secret.
3. Set a long random `STUDIO_SECRET`.
4. The signed-upload endpoint is `POST /api/cloudinary/sign` and requires the `x-studio-secret` header.
5. Store uploaded public IDs in the `portfolio_projects.cloudinary_public_id` column.

The static demo gallery uses curated remote placeholder photographs. Replace these with your own Cloudinary assets before launch.

## 3. Deploy to Vercel

### Dashboard method

1. Push this folder to a GitHub repository.
2. Import the repository into Vercel.
3. Add every variable from `.env.example` under Project Settings → Environment Variables.
4. Deploy.

### CLI method

```bash
npm i -g vercel
vercel
vercel env pull .env.local
vercel --prod
```

Set `NEXT_PUBLIC_SITE_URL` to the final production domain and redeploy so canonical metadata, sitemap, and Open Graph URLs are correct.

## Main content files

- `lib/content.ts` — services, packages, testimonials, process, and demo portfolio items
- `app/page.tsx` — homepage sections
- `app/about/page.tsx` — founder and brand story
- `app/api/contact/route.ts` — Supabase and Resend enquiry workflow
- `app/api/cloudinary/sign/route.ts` — protected upload signature endpoint
- `supabase/schema.sql` — database tables, RLS, policies, and indexes
- `app/globals.css` — brand tokens, typography, and global visual effects

## Brand details currently included

- Brand: MilanoFloral
- Founder / Creative Director: Dilukshi Dias
- Email: milanofloral@mail.com
- Phone: 072 884 6992 / 077 444 7432
- Services: wedding planning, floral and venue styling, destination event planning, event management, creative direction, and wedding fireworks
- Firework packages: Platinum LKR 70,000; Silver LKR 95,000; Gold LKR 125,000

Review package inclusions and prices before production launch, as final effects can vary by venue and safety requirements.

## Production checklist

- Replace placeholder gallery images with owned Cloudinary media
- Add the final Instagram URL
- Confirm legal business address and service areas
- Verify the Resend domain and test enquiry delivery
- Test the Supabase tables and RLS settings
- Add analytics and a cookie notice if your chosen analytics setup requires consent
- Run `npm run build` before every production deployment

## License

Private project for MilanoFloral. Third-party placeholder photographs are loaded from Unsplash and should be replaced with business-owned media for the final public launch.
