import { Link } from 'react-router-dom';
import RecipeGrid from '../components/RecipeGrid';
import StatCard from '../components/StatCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';
import { useRecipes, useToggleLike } from '../hooks/useRecipes';

const DashboardPage = () => {
  const { user } = useAuth();
  const { data, isLoading } = useRecipes({ user: user?.id, limit: 50 });
  const toggleLike = useToggleLike();
  const recipes = data?.data ?? [];

  const totalLikes = recipes.reduce((sum, recipe) => sum + (recipe.likes?.length ?? 0), 0);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-100 bg-white px-6 py-8 shadow-card">
        <p className="text-sm uppercase tracking-widest text-slate-400">Welcome back</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Chef {user?.name}</h1>
        <p className="mt-3 text-slate-500">
          Manage your recipes, review flashcards, and keep practicing until every technique sticks.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/recipes/new"
            className="rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white"
          >
            + New Recipe
          </Link>
          <Link
            to="/auth"
            className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600"
          >
            Update profile
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard label="Recipes shared" value={recipes.length} />
        <StatCard label="Total likes" value={totalLikes} />
        <StatCard label="Flashcards generated" value={recipes.length} />
      </section>

      {isLoading ? (
        <LoadingSpinner label="Loading your recipes..." />
      ) : recipes.length ? (
        <RecipeGrid recipes={recipes} onLike={(id) => toggleLike.mutate(id)} />
      ) : (
        <EmptyState
          title="You have no recipes yet"
          description="Share your first recipe to unlock personalized flashcards."
          action={
            <Link
              to="/recipes/new"
              className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
            >
              Create recipe
            </Link>
          }
        />
      )}
    </div>
  );
};

export default DashboardPage;

