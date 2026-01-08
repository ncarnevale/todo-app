import { useTodos } from "../../queries/hooks";
import styles from "./TodoList.module.css";
import AddTodo from "../AddTodo/AddTodo";
import TodoRow from "../TodoRow/TodoRow";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function TodoList() {
  const { data: todos = [], isLoading, isError } = useTodos();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner delay={300} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.errorMessage}>
        Something went wrong. Please reload the page.
      </div>
    );
  }

  return (
    <div className={styles.todoList}>
      {!todos.length && (
        <div className={styles.emptyMessage}>(No to-dos yet!)</div>
      )}
      {todos.map((todo) => (
        <TodoRow key={todo.id} todo={todo} />
      ))}
      <AddTodo />
    </div>
  );
}

export default TodoList;
