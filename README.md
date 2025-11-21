# Recipe Flashcards Platform

AI-assisted MERN stack platform where cooks can publish recipes, search/filter the catalog, and instantly transform any recipe into spaced-repetition flashcards powered by Google Gemini.

## Features
- JWT authentication with profile management
- Recipe CRUD with likes, comments, text search, filters, and pagination
- AI flashcard generation + review deck with navigation
- React Router app with Tailwind UI, protected routes, dashboards
- React Query data layer, form validation, responsive components
- Automated tests: Jest + Supertest, Vitest + RTL, Playwright smoke E2E
- Deployment-ready configs (Render backend, Vercel frontend) and CI workflow

## Architecture
| Layer | Tech | Notes |
| --- | --- | --- |
| Backend | Node.js, Express 5, MongoDB (Mongoose) | REST APIs, Gemini integration, auth middleware |
| Frontend | React + Vite, TailwindCSS, React Query | SPA with marketing + app shell |
| AI | Google Gemini `gemini-1.5-flash` | Structured prompt creates 4–6 flashcards per recipe |
| Testing | Jest/Supertest, Vitest/RTL, Playwright | Unit, integration, E2E |
| Deployment | Render (API), Vercel (web) | `.env.example` guides secrets |

See `docs/architecture.md` for deeper diagrams.

## Getting Started

### Prereqs
- Node.js 18+
- MongoDB (local or Atlas)
- Google Gemini API key (free at https://aistudio.google.com/apikey)

### Backend
```bash
cd backend
cp env.example .env
npm install
npm run dev
```

### Frontend
```bash
cd frontend
cp env.example .env
npm install
npm run dev
```

Visit `http://localhost:5173` and ensure the backend `PORT` matches `VITE_API_URL`.

## Testing
```bash
# Backend unit/integration
cd backend && npm test

# Frontend unit tests
cd frontend && npm run test

# Playwright smoke E2E
cd frontend && npm run test:e2e
```

## Deployment
Detailed instructions plus CI/CD notes live in `docs/deployment.md`. High level:
1. Provision MongoDB Atlas + Gemini API key.
2. Deploy backend to Render (Docker or Node buildpack) with env vars.
3. Deploy frontend to Vercel, setting `VITE_API_URL` to the Render URL.
4. Update the table below after successful deploys.

| Service | URL | Status |
| --- | --- | --- |
| Frontend (Vercel) | _add after deploy_ | Pending |
| Backend (Render) | _add after deploy_ | Pending |

## Documentation Assets
- API reference: `docs/api.md`
- Architecture diagrams: `docs/architecture.md`
- Deployment/CI guide: `docs/deployment.md`
- Demo walkthrough script: `docs/demo-script.md`
- Screenshots & demo video: add to `docs/assets/` and link here once captured (target 5–10 min demo video).

## Repo Structure
```
backend/   # Express API + tests
frontend/  # React app + tests + e2e
docs/      # Architecture, deployment, API, demo script
.github/   # CI workflow
```

## Next Steps
- Capture UI screenshots and recording for submission.
- Configure environment secrets in hosting providers.
- Monitor logs + metrics once deployed.
```

## deployment URLs
- BACKEND: https://mern-final-project-u7u0.onrender.com
- FRONTEND: https://mern-final-project-wk8.netlify.app/
