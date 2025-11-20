import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatters';

const RecipeCard = ({ recipe, onLike }) => (
  <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-1">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">{recipe.category}</p>
        <Link
          to={`/recipes/${recipe._id}`}
          className="mt-1 block text-lg font-semibold text-slate-900 hover:text-brand-600"
        >
          {recipe.title}
        </Link>
        <p className="text-sm text-slate-500">by {recipe.user?.name ?? 'Unknown'}</p>
      </div>
      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600">
        {recipe.difficulty}
      </span>
    </div>

    <ul className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
      <li>Prep: {recipe.prepTime || 0} mins</li>
      <li className="h-1 w-1 rounded-full bg-slate-300" />
      <li>{recipe.ingredients.length} ingredients</li>
      <li className="h-1 w-1 rounded-full bg-slate-300" />
      <li>Updated {formatDate(recipe.updatedAt)}</li>
    </ul>

    <p className="mt-4 line-clamp-3 text-sm text-slate-600">{recipe.instructions}</p>

    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 transition hover:border-brand-200 hover:text-brand-600"
        onClick={() => onLike?.(recipe._id)}
      >
        ❤️ {recipe.likes?.length ?? 0}
      </button>
      <Link
        to={`/recipes/${recipe._id}`}
        className="text-sm font-semibold text-brand-600 transition hover:text-brand-500"
      >
        View details →
      </Link>
    </div>
  </article>
);

export default RecipeCard;

