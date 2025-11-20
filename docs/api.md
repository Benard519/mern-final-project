# API Reference

Base URL: `https://<backend-host>/api`

## Auth
| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/auth/register` | Create user `{ name, email, password }` |
| POST | `/auth/login` | Login with `{ email, password }` |
| GET | `/auth/me` | Get profile (JWT required) |
| PUT | `/auth/me` | Update profile fields + optional password |

### Responses
```json
{
  "user": { "id": "string", "name": "Chef", "email": "chef@foo.com" },
  "token": "jwt"
}
```

## Recipes
| Method | Endpoint | Notes |
| --- | --- | --- |
| GET | `/recipes` | Query params: `search`, `category`, `difficulty`, `maxPrepTime`, `user`, `page`, `limit` |
| POST | `/recipes` | Auth required. Body includes `title`, `ingredients[]`, `instructions`, `category`, optional `difficulty`, `prepTime`, `imageUrl` |
| GET | `/recipes/:id` | Full recipe w/ likes, comments |
| PUT | `/recipes/:id` | Auth + owner |
| DELETE | `/recipes/:id` | Auth + owner |
| POST | `/recipes/:id/like` | Toggle like |
| POST | `/recipes/:id/comments` | `{ content }` |
| DELETE | `/recipes/:id/comments/:commentId` | Auth + comment owner |

List responses:
```json
{
  "data": [ { "title": "...", "ingredients": [] } ],
  "pagination": { "page": 1, "pages": 3, "total": 24 }
}
```

## Flashcards
| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/flashcards` | Auth. Body `{ recipeId }`, triggers OpenAI |
| GET | `/flashcards/:recipeId` | Fetch stored deck |

Flashcard document:
```json
{
  "_id": "flashcardId",
  "recipe": "recipeId",
  "createdBy": "userId",
  "cards": [
    { "prompt": "What temperature?", "answer": "Bake at 180°C" }
  ]
}
```

## Error Handling
All endpoints return JSON `{ message, errors? }`. Validation failures are HTTP 400 with `errors[]` from `express-validator`. Unauthorized actions return 401/403. Internal errors include stack traces only when `NODE_ENV !== production`.

