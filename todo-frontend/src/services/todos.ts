import { API_BASE_URL } from "./config";
import type { TypeTodo, TypeCreateTodoRequest } from "../types/todo";

const TODOS_URL = `${API_BASE_URL}/todos`;

// For debugging/simulating loading states
// Ex. await waitSeconds(5);
// function waitSeconds(seconds: number) {
//   return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
// }

export async function getTodos(): Promise<TypeTodo[]> {
  const res = await fetch(TODOS_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  return res.json();
}

export async function createTodo(
  request: TypeCreateTodoRequest
): Promise<TypeTodo> {
  const res = await fetch(TODOS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    throw new Error("Failed to create todo");
  }
  return res.json();
}

export async function toggleTodo(id: number): Promise<TypeTodo> {
  const res = await fetch(`${TODOS_URL}/${id}`, {
    method: "PUT",
  });

  if (!res.ok) {
    throw new Error("Failed to toggle todo");
  }
  return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${TODOS_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }
}
