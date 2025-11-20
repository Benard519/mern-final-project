import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  useCreateRecipe,
  useRecipe,
  useUpdateRecipe,
} from '../hooks/useRecipes';
import LoadingSpinner from '../components/LoadingSpinner';

const defaultValues = {
  title: '',
  ingredients: '',
  instructions: '',
  category: '',
  difficulty: 'easy',
  prepTime: 0,
  imageUrl: '',
};

const RecipeFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const { user } = useAuth();
  const { data: recipe, isLoading } = useRecipe(id, { enabled: isEditing });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });
  const createRecipe = useCreateRecipe();
  const updateRecipe = useUpdateRecipe();

  useEffect(() => {
    if (recipe) {
      reset({
        title: recipe.title,
        ingredients: recipe.ingredients.join('\n'),
        instructions: recipe.instructions,
        category: recipe.category,
        difficulty: recipe.difficulty,
        prepTime: recipe.prepTime,
        imageUrl: recipe.imageUrl ?? '',
      });
    }
  }, [recipe, reset]);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      prepTime: Number(values.prepTime),
      ingredients: values.ingredients.split('\n').map((item) => item.trim()).filter(Boolean),
    };

    if (isEditing) {
      await updateRecipe.mutateAsync({ id, data: payload });
    } else {
      await createRecipe.mutateAsync(payload);
    }

    navigate(isEditing ? `/recipes/${id}` : '/dashboard');
  };

  if (isEditing && isLoading) {
    return <LoadingSpinner label="Loading recipe..." />;
  }

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-100 bg-white p-8 shadow-card">
      <p className="text-xs uppercase tracking-widest text-slate-400">
        {isEditing ? 'Edit recipe' : 'New recipe'}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">
        {isEditing ? `Update ${recipe?.title}` : `Hey ${user?.name}, share your dish`}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div>
          <label className="text-sm font-semibold text-slate-700">Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="Grandma's cinnamon rolls"
          />
          {errors.title && <p className="mt-1 text-xs text-rose-500">{errors.title.message}</p>}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">Category</label>
            <input
              {...register('category', { required: 'Category is required' })}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
              placeholder="Dessert"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Difficulty</label>
            <select
              {...register('difficulty')}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">Ingredients</label>
          <textarea
            rows="5"
            {...register('ingredients', { required: 'Ingredients are required' })}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="One per line"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700">Instructions</label>
          <textarea
            rows="6"
            {...register('instructions', { required: 'Instructions are required' })}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="Step-by-step directions..."
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">Prep time (mins)</label>
            <input
              type="number"
              min="0"
              {...register('prepTime')}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Image URL</label>
            <input
              {...register('imageUrl')}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm"
              placeholder="https://"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={createRecipe.isLoading || updateRecipe.isLoading}
          className="w-full rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isEditing
            ? updateRecipe.isLoading
              ? 'Saving...'
              : 'Save changes'
            : createRecipe.isLoading
              ? 'Publishing...'
              : 'Publish recipe'}
        </button>
      </form>
    </div>
  );
};

export default RecipeFormPage;

