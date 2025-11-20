# Demo Walkthrough Script (5–10 min)

## 1. Intro (0:00–0:45)
- Greet audience, state goal: “Recipe Flashcards – AI-powered learning for cooks.”
- Highlight MERN stack + OpenAI integration + deployment targets.

## 2. Landing & Search (0:45–2:00)
- Load frontend URL.
- Show hero copy, explain filters/search.
- Type “dessert” search, adjust prep time slider → show instant filtering.

## 3. Auth & Dashboard (2:00–3:30)
- Click “Share a recipe” → redirected to auth.
- Register or login with demo account.
- Show dashboard stats (recipes shared, likes, flashcards).
- Mention React Query caching and protected routes.

## 4. Create Recipe (3:30–5:00)
- Click “+ New Recipe”.
- Fill form (title, category, ingredients, instructions, prep time).
- Submit; highlight validation + success redirect.

## 5. Flashcards (5:00–7:00)
- Open recipe details.
- Click “Generate / refresh” to call OpenAI, narrate server flow.
- Review deck UI (next/previous, progress bar).
- Open dedicated `/flashcards/:id/flashcards` page for study mode.

## 6. Social Interactions (7:00–8:00)
- Like recipe, add a comment, delete comment to show permissions.
- Emphasize search index + filters enabling discovery.

## 7. Testing & Deployment (8:00–9:30)
- Show `npm test` (backend) & `npm run test` (frontend) outputs/screenshots.
- Mention Playwright smoke test + CI workflow.
- Explain deployment steps (Render + Vercel) referencing docs.

## 8. Closing (9:30–10:00)
- Summarize benefits.
- Call to action: “Clone repo, add recipes, share with peers.”

