import { useParams } from 'react-router-dom';
import FlashcardDeck from '../components/FlashcardDeck';
import LoadingSpinner from '../components/LoadingSpinner';
import { useFlashcards, useGenerateFlashcards } from '../hooks/useFlashcards';

const FlashcardsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useFlashcards(id);
  const generateFlashcards = useGenerateFlashcards();

  const handleRegenerate = async () => {
    await generateFlashcards.mutateAsync(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-3xl border border-slate-100 bg-white p-6 shadow-card md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400">Recipe flashcards</p>
          <h1 className="text-3xl font-bold text-slate-900">Review deck</h1>
        </div>
        <button
          type="button"
          onClick={handleRegenerate}
          disabled={generateFlashcards.isLoading}
          className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {generateFlashcards.isLoading ? 'Refreshing...' : 'Regenerate with AI'}
        </button>
      </div>

      {isLoading ? (
        <LoadingSpinner label="Loading flashcards..." />
      ) : isError ? (
        <p className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-600">
          No flashcards found. Generate them from the recipe page first.
        </p>
      ) : (
        <FlashcardDeck cards={data.cards} />
      )}
    </div>
  );
};

export default FlashcardsPage;

