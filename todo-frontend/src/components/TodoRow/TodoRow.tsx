import { useState } from "react";
import { useToggleTodo, useDeleteTodo } from "../../queries/hooks";
import styles from "./TodoRow.module.css";
import type { TypeTodo } from "../../types/todo";

type TypeTodoRowProps = {
  todo: TypeTodo;
};
function TodoRow({ todo }: TypeTodoRowProps) {
  const [idsPendingToggle, setIdsPendingToggle] = useState<Set<number>>(
    new Set()
  );
  const [idsPendingDelete, setIdsPendingDelete] = useState<Set<number>>(
    new Set()
  );

  const { mutate: toggleTodo } = useToggleTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const onToggle = (id: number) => {
    setIdsPendingToggle(new Set(idsPendingToggle).add(id));
    toggleTodo(id, {
      onSettled: () => {
        const newIds = new Set(idsPendingToggle);
        newIds.delete(id);
        setIdsPendingToggle(newIds);
      },
    });
  };

  const onDelete = (id: number) => {
    setIdsPendingDelete(new Set(idsPendingDelete).add(id));
    deleteTodo(id, {
      onSettled: () => {
        const newIds = new Set(idsPendingDelete);
        newIds.delete(id);
        setIdsPendingDelete(newIds);
      },
    });
  };

  return (
    <div className={styles.todoRow}>
      <div className={styles.todoItem}>
        <div
          className={`${styles.todoText} ${
            todo.isCompleted ? styles.completed : ""
          }`}
        >
          {todo.text}
        </div>
        <div className={styles.actions}>
          <input
            type="checkbox"
            className={styles.todoCheckbox}
            checked={todo.isCompleted}
            onChange={() => onToggle(todo.id)}
            disabled={idsPendingToggle.has(todo.id)}
          />
        </div>
      </div>
      <button
        className={styles.deleteButton}
        disabled={idsPendingDelete.has(todo.id)}
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoRow;
