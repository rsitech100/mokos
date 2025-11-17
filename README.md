This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
- Google OAuth credentials (see [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md))
- API base URL

### 3. Run Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

- 🔐 **Authentication System**
  - Email/Password login with OTP verification
  - Google OAuth login
  - JWT token-based authentication
  
- 👤 **User Profile Management**
  - Personal details (name, birth date, gender)
  - Contact information (phone, email)
  - Profile photo upload
  
- 🛒 **E-commerce Features**
  - Product listing and details
  - Shopping cart
  - Checkout and payment
  - Order tracking
  - Product reviews

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── google/callback/
│   ├── api/               # API routes and services
│   └── ...
├── components/            # React components
│   ├── Login/
│   ├── Register/
│   ├── Profile/
│   └── ...
├── context/              # React Context providers
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── lib/                  # Utility functions
│   └── google-auth.ts
└── types/                # TypeScript type definitions
```

## Authentication Setup

This project supports two authentication methods:

1. **Email/Password with OTP**
   - Users register with email and password
   - OTP sent via email for verification
   - After verification, user receives JWT token

2. **Google OAuth**
   - One-click sign in with Google
   - Auto-creates account if user doesn't exist
   - See [GOOGLE_OAUTH_SETUP.md](./GOOGLE_OAUTH_SETUP.md) for detailed setup instructions

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
