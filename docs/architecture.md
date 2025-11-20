# Recipe Flashcards Platform – Architecture Overview

## Tech Stack
- Backend: Node.js, Express 5, MongoDB via Mongoose, JWT auth, OpenAI API.
- Frontend: React + Vite, Tailwind CSS, React Router, React Query / Context for state.
- Testing: Jest + Supertest (backend), Vitest + React Testing Library (frontend), Playwright for E2E.
- Deployment: Backend on Render, Frontend on Vercel, MongoDB Atlas for database.

## System Components
1. **API Server (`backend`)**
   - Routes grouped under `/api/auth`, `/api/recipes`, `/api/flashcards`.
   - Middleware: logging (morgan), CORS, JSON parsing, JWT auth guard, validation, centralized errors.
   - Services: Flashcard generation via OpenAI `gpt-4o-mini`.
   - Models: `User`, `Recipe`, `Flashcard`. Recipes embed comments & likes, index for search.

2. **Web Client (`frontend`)**
   - Pages: Home (hero + search), Auth (login/register), Dashboard (my recipes, filters), Recipe Details (comments, likes, flashcards), Create/Edit, Flashcard Review deck.
   - Components for forms, recipe cards, flashcard carousel, filters, layout shell.
   - API layer hooking into backend, optimistic updates for likes/comments.

3. **AI Flashcard Flow**
   - User triggers `POST /api/flashcards` with recipe ID.
   - Backend fetches recipe, sends structured prompt to OpenAI, stores returned `cards` array in `Flashcard` document.
   - Frontend fetches per-recipe flashcards and renders deck navigation.

## Data Flow
1. Auth: Credentials → `/api/auth/login` → JWT → stored in `localStorage` → attached in API calls.
2. Recipe CRUD: React forms → API service → Express controllers → MongoDB.
3. Search/Filtering: Query params from UI → backend query builder (text search + filters) → paginated results.
4. Flashcards: Recipe detail page action → backend service → stored flashcards → UI deck.

## Testing Strategy
- Backend unit/integration tests cover auth, recipe CRUD, flashcard generation (mock OpenAI) using mongodb-memory-server.
- Frontend unit tests cover components, forms, hooks; integration tests for routing.
- Playwright script covers full user journey (register → create → search → flashcards).

## Deployment/CI
- GitHub Actions workflow runs lint, tests, build for both apps.
- On main branch success: deploy frontend to Vercel via CLI/API, backend to Render via webhook.
- `.env.example` files document required secrets; production secrets managed in platform dashboards.


