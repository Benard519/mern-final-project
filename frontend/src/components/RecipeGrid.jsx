import RecipeCard from './RecipeCard';

const RecipeGrid = ({ recipes = [], onLike }) => (
  <div className="grid gap-6 md:grid-cols-2">
    {recipes.map((recipe) => (
      <RecipeCard key={recipe._id} recipe={recipe} onLike={onLike} />
    ))}
  </div>
);

export default RecipeGrid;

