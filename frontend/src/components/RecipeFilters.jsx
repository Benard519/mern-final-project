import { categories, difficulties } from '../constants/filters';

const RecipeFilters = ({ values, onChange }) => {
  const handleInput = (event) => {
    const { name, value } = event.target;
    onChange({ [name]: value });
  };

  return (
    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4">
      <input
        type="text"
        name="search"
        placeholder="Search by title, ingredient..."
        value={values.search}
        onChange={handleInput}
        className="rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100 md:col-span-2"
      />

      <select
        name="category"
        value={values.category}
        onChange={handleInput}
        className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        name="difficulty"
        value={values.difficulty}
        onChange={handleInput}
        className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
      >
        <option value="">Any difficulty</option>
        {difficulties.map((difficulty) => (
          <option key={difficulty} value={difficulty}>
            {difficulty}
          </option>
        ))}
      </select>

      <div className="md:col-span-4">
        <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-400">
          <span>Max prep time (mins)</span>
          <span className="text-brand-600">{values.maxPrepTime || 'No limit'}</span>
        </label>
        <input
          type="range"
          min="0"
          max="180"
          step="10"
          name="maxPrepTime"
          value={values.maxPrepTime || 0}
          onChange={handleInput}
          className="mt-2 w-full accent-brand-500"
        />
      </div>
    </div>
  );
};

export default RecipeFilters;

