# AI Trading Bots & Live Hackathons Website

This repository contains a React website built with Vite for showcasing AI trading bots, live hackathons, and international news updates.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Deployment

This app is configured for Vercel deployment. Connect your repository to Vercel and it will use:

- Build command: `npm run build`
- Output directory: `dist`

To test API routes locally, use the Vercel CLI:

```bash
npx vercel dev --yes
```

or use the project script:

```bash
npm run dev:vercel
```

If `3000` is already in use, Vercel may start on another port such as `3001`. Open the URL shown in the terminal.

That command runs the local server with `/api/*` function support.

> `npm run dev` only starts the React frontend and does not run the Vercel serverless API routes.

## SerpApi Configuration

This project uses SerpApi for live AI trading bot news and live AI trading agent hackathon search results.

1. Copy `.env.example` to `.env` locally if needed.
2. Add your SerpApi API key to `.env`:

```bash
SERPAPI_KEY=your_serpapi_key_here
```

3. Make sure `.env` is not committed to git. The repo already ignores it via `.gitignore`.
4. In Vercel, add the same environment variable under your project settings:

- Key: `SERPAPI_KEY`
- Value: your SerpApi API key

5. Redeploy the Vercel site after saving the environment variable.

The serverless API routes in this app use `process.env.SERPAPI_KEY`, so the key stays private and is only used on the backend.
