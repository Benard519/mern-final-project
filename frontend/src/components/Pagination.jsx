const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;
  const prevDisabled = page <= 1;
  const nextDisabled = page >= pages;

  return (
    <div className="mt-8 flex items-center justify-between rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={prevDisabled}
        className="rounded-full px-3 py-1 font-medium text-slate-600 disabled:opacity-40"
      >
        Prev
      </button>
      <p className="text-slate-500">
        Page <span className="font-semibold text-slate-800">{page}</span> of {pages}
      </p>
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={nextDisabled}
        className="rounded-full px-3 py-1 font-medium text-slate-600 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

