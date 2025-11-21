import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { recipeApi } from '../services/api';

export const recipeKeys = {
  all: ['recipes'],
  lists: (filters) => ['recipes', { ...filters }],
  detail: (id) => ['recipe', id],
};

const sanitizedFilters = (filters = {}) =>
  Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== undefined && value !== null && value !== ''
    )
  );

export const useRecipes = (filters) => {
  const params = useMemo(() => sanitizedFilters(filters), [filters]);
  return useQuery({
    queryKey: recipeKeys.lists(params),
    queryFn: () => recipeApi.list(params),
    keepPreviousData: true,
    retry: 1,
    onError: (error) => {
      console.error('Error fetching recipes:', error);
    },
  });
};

export const useRecipe = (id, options = {}) =>
  useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: () => recipeApi.detail(id),
    enabled: Boolean(id),
    ...options,
  });

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => recipeApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.all });
    },
  });
};

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => recipeApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: recipeKeys.all });
    },
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => recipeApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.all });
    },
  });
};

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => recipeApi.toggleLike(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: recipeKeys.all });
    },
  });
};

export const useCommentMutations = () => {
  const queryClient = useQueryClient();

  const addComment = useMutation({
    mutationFn: ({ id, content }) => recipeApi.addComment(id, { content }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.detail(id) });
    },
  });

  const deleteComment = useMutation({
    mutationFn: ({ id, commentId }) => recipeApi.deleteComment(id, commentId),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: recipeKeys.detail(id) });
    },
  });

  return { addComment, deleteComment };
};

