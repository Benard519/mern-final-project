import { useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import RecipeFilters from '../components/RecipeFilters';
import RecipeGrid from '../components/RecipeGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import { useRecipes, useToggleLike } from '../hooks/useRecipes';
import { useAuth } from '../context/AuthContext';

const defaultFilters = {
  search: '',
  category: '',
  difficulty: '',
  maxPrepTime: '',
  page: 1,
};

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { authenticated } = useAuth();
  const filters = useMemo(() => {
    const entries = Object.entries(defaultFilters).map(([key, fallback]) => [
      key,
      searchParams.get(key) || fallback,
    ]);
    const result = Object.fromEntries(entries);
    return {
      ...result,
      page: Number(result.page) || 1,
      maxPrepTime: result.maxPrepTime ? Number(result.maxPrepTime) : '',
    };
  }, [searchParams]);

  const { data, isLoading } = useRecipes({ ...filters, limit: 12 });
  const toggleLike = useToggleLike();

  const onChange = (next) => {
    const merged = { ...filters, ...next, page: next.page ?? filters.page };
    const query = new URLSearchParams();
    Object.entries(merged).forEach(([key, value]) => {
      if (value) query.set(key, value);
    });
    setSearchParams(query);
  };

  const results = data?.data ?? [];
  const pagination = data?.pagination ?? { page: 1, pages: 1 };

  return (
    <div className="space-y-10">
      <section className="gradient-bg rounded-3xl border border-slate-100 bg-white px-6 py-12 shadow-card md:px-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-500">
          AI-powered study cards
        </p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Master your recipes faster with interactive flashcards.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Browse community recipes, tailor the filters to your pantry, and turn any dish into a set
          of memory-friendly flashcards powered by OpenAI.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/recipes/new"
            className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Share a recipe
          </Link>
          <Link
            to="/dashboard"
            className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700"
          >
            Go to dashboard
          </Link>
        </div>
      </section>

      <RecipeFilters values={filters} onChange={onChange} />

      {isLoading ? (
        <LoadingSpinner label="Fetching recipes..." />
      ) : results.length ? (
        <>
          <RecipeGrid
            recipes={results}
            onLike={(id) => {
              if (!authenticated) {
                navigate('/auth');
                return;
              }
              toggleLike.mutate(id);
            }}
          />
          <Pagination
            page={Number(pagination.page)}
            pages={pagination.pages}
            onPageChange={(page) => onChange({ page })}
          />
        </>
      ) : (
        <EmptyState
          title="No recipes match your filters"
          description="Try adjusting the search, category, or difficulty."
          action={
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
            >
              Reset filters
            </button>
          }
        />
      )}
    </div>
  );
};

export default HomePage;

