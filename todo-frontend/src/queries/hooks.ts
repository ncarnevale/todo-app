import type { TypeCreateTodoRequest, TypeTodo } from "../types/todo";
import {
  getTodos,
  toggleTodo,
  createTodo,
  deleteTodo,
} from "../services/todos";
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryOptions,
  type MutationOptions,
  type DefaultError,
} from "@tanstack/react-query";
import { TODOS_QUERY_KEY } from "./constants";

export const useTodos = (queryOptions: QueryOptions<TypeTodo[]> = {}) =>
  useQuery<TypeTodo[]>({
    queryKey: TODOS_QUERY_KEY,
    queryFn: getTodos,
    ...queryOptions,
  });

export const useCreateTodo = (
  mutationOptions: MutationOptions<
    TypeTodo,
    DefaultError,
    TypeCreateTodoRequest
  > = {}
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
    ...mutationOptions,
  });
};

export const useToggleTodo = (
  mutationOptions: MutationOptions<TypeTodo, DefaultError, number> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
    ...mutationOptions,
  });
};

export const useDeleteTodo = (
  mutationOptions: MutationOptions<void, DefaultError, number> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEY });
    },
    ...mutationOptions,
  });
};
