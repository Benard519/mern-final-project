import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommentList from '../components/CommentList';
import FlashcardDeck from '../components/FlashcardDeck';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import {
  useCommentMutations,
  useRecipe,
  useToggleLike,
} from '../hooks/useRecipes';
import { useFlashcards, useGenerateFlashcards } from '../hooks/useFlashcards';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { data: recipe, isLoading } = useRecipe(id);
  const { data: flashcards, isLoading: flashcardsLoading } = useFlashcards(id, {
    enabled: Boolean(id),
  });
  const generateFlashcards = useGenerateFlashcards();
  const toggleLike = useToggleLike();
  const { addComment, deleteComment } = useCommentMutations();
  const [comment, setComment] = useState('');

  if (isLoading) {
    return <LoadingSpinner label="Fetching recipe..." />;
  }

  if (!recipe) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-lg font-semibold text-slate-700">Recipe not found.</p>
        <Link to="/" className="mt-4 inline-flex text-brand-600">
          Go home
        </Link>
      </div>
    );
  }

  const handleComment = async (event) => {
    event.preventDefault();
    if (!comment.trim()) return;
    await addComment.mutateAsync({ id, content: comment });
    setComment('');
  };

  const handleGenerate = async () => {
    await generateFlashcards.mutateAsync(id);
  };

  const isOwner = user?.id === recipe.user?._id;

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">
              {recipe.category} · {recipe.difficulty} · {recipe.prepTime} mins
            </p>
            <h1 className="mt-2 text-4xl font-bold text-slate-900">{recipe.title}</h1>
            <p className="mt-2 text-sm text-slate-500">by {recipe.user?.name}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => toggleLike.mutate(id)}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
            >
              ❤️ {recipe.likes?.length ?? 0}
            </button>
            {isOwner && (
              <Link
                to={`/recipes/${id}/edit`}
                className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white"
              >
                Edit recipe
              </Link>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Ingredients</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
              {recipe.ingredients.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Instructions</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
              {recipe.instructions}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Flashcards</h2>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={generateFlashcards.isLoading}
              className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {generateFlashcards.isLoading ? 'Generating...' : 'Generate / refresh'}
            </button>
            <Link
              to={`/recipes/${id}/flashcards`}
              className="text-sm font-semibold text-slate-600"
            >
              Open study mode →
            </Link>
          </div>
          <div className="mt-6">
            {flashcardsLoading ? (
              <LoadingSpinner label="Loading flashcards..." />
            ) : (
              <FlashcardDeck cards={flashcards?.cards} />
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
          <h2 className="text-xl font-semibold text-slate-900">Comments</h2>
          <form onSubmit={handleComment} className="mt-4 space-y-3">
            <textarea
              rows="3"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Share a tip or substitution..."
              className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
            <button
              type="submit"
              disabled={addComment.isLoading}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {addComment.isLoading ? 'Posting...' : 'Post comment'}
            </button>
          </form>
          <div className="mt-6">
            <CommentList
              comments={recipe.comments}
              currentUserId={user?.id}
              onDelete={(commentId) => deleteComment.mutate({ id, commentId })}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeDetailPage;

