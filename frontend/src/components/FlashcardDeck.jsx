import { useMemo, useState } from 'react';

const FlashcardDeck = ({ cards = [] }) => {
  const [index, setIndex] = useState(0);
  const current = cards[index] ?? {};

  const progress = useMemo(() => ((index + 1) / cards.length) * 100 || 0, [index, cards.length]);

  if (!cards.length) {
    return <p className="text-sm text-slate-500">No flashcards generated yet.</p>;
  }

  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
        <span>Card {index + 1}</span>
        <span>{cards.length} total</span>
      </div>
      <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-brand-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-6 rounded-2xl bg-slate-50 p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">Prompt</p>
        <p className="mt-2 text-lg font-semibold text-slate-900">{current.prompt}</p>
        <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-brand-500">Answer</p>
        <p className="mt-2 text-base text-slate-700">{current.answer}</p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={index === cards.length - 1}
          onClick={() => setIndex((i) => Math.min(i + 1, cards.length - 1))}
          className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardDeck;

