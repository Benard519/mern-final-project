# Deployment & CI/CD Guide

## Environments
- **Production database:** MongoDB Atlas shared cluster
- **Backend hosting:** Render (Node build)
- **Frontend hosting:** Vercel
- **Secrets:** Stored in each platform dashboard, never committed

## Environment Variables
| Service | Key | Description |
| --- | --- | --- |
| Backend | `PORT` | Default 5000 |
| Backend | `MONGO_URI` | Atlas connection string |
| Backend | `JWT_SECRET` | Strong random string |
| Backend | `OPENAI_API_KEY` | OpenAI key with Responses API access |
| Backend | `FRONTEND_URL` | Production Vercel domain |
| Frontend | `VITE_API_URL` | Render backend URL + `/api` |

## Backend (Render)
1. Create new Web Service from GitHub repo.
2. Build command: `cd backend && npm install && npm run build` *(Express needs no build, so keep as `npm install`)*.
3. Start command: `cd backend && npm start`.
4. Add env vars from table above.
5. Enable auto-deploy on `main`.

## Frontend (Vercel)
1. Import project, set root to `frontend`.
2. Set `VITE_API_URL` secret pointing to Render API.
3. Build command auto-detected (`npm run build`).
4. After deploy, copy the URL into `README.md`.

## Continuous Integration
GitHub Actions workflow `.github/workflows/ci.yml`:
- Runs on PRs + pushes to `main`.
- Steps: install deps, lint/test backend, lint/test frontend, build frontend.
- Future: add deploy jobs calling Render/Vercel webhooks after successful main build.

## Manual QA Checklist
- [ ] Register/login flow (desktop + mobile viewport via DevTools)
- [ ] Recipe CRUD, search, filters, pagination
- [ ] Flashcard generation/regeneration and deck navigation
- [ ] Comments + likes with auth guard
- [ ] Accessibility quick pass (keyboard nav, aria labels)
- [ ] Playwright smoke test (`npm run test:e2e`)

## Rollback
Render keeps last deploy for instant rollback. Vercel offers “Redeploy previous”. Document timestamps in project tracker when doing manual promotion.

