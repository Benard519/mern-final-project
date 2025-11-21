import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { flashcardApi } from '../services/api';

export const flashcardKeys = {
  detail: (recipeId) => ['flashcards', recipeId],
};

export const useFlashcards = (recipeId, options = {}) =>
  useQuery({
    queryKey: flashcardKeys.detail(recipeId),
    queryFn: () => flashcardApi.byRecipe(recipeId),
    enabled: Boolean(recipeId),
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });

export const useGenerateFlashcards = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (recipeId) => flashcardApi.generate({ recipeId }),
    onSuccess: (data, recipeId) => {
      // Update the cache with the new data immediately
      queryClient.setQueryData(flashcardKeys.detail(recipeId), data);
      // Also invalidate to ensure fresh data
      queryClient.invalidateQueries({ queryKey: flashcardKeys.detail(recipeId) });
    },
  });
};

