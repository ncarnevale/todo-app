import { useState } from "react";
import { useCreateTodo } from "../../queries/hooks";
import styles from "./AddTodo.module.css";

function AddTodo() {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [workingText, setWorkingText] = useState<string>("");

  const { mutate: createTodo, isPending: isCreatePending } = useCreateTodo();
  const onAddNew = () => {
    createTodo(
      { text: workingText },
      {
        onSuccess: () => {
          setIsAdding(false);
          setWorkingText("");
        },
      }
    );
  };

  const onCancelAdd = () => {
    setIsAdding(false);
    setWorkingText("");
  };

  return (
    <>
      {!isAdding && (
        <button className={styles.addButton} onClick={() => setIsAdding(true)}>
          Click to Add
        </button>
      )}
      {isAdding && (
        <div className={styles.addRow}>
          <input
            className={styles.addTodoInput}
            type="text"
            value={workingText}
            onChange={(e) => setWorkingText(e.currentTarget.value)}
          />
          <button
            className={styles.saveButton}
            onClick={onAddNew}
            disabled={isCreatePending || !workingText.trim()}
          >
            Save
          </button>
          <button
            className={styles.cancelButton}
            onClick={onCancelAdd}
            disabled={isCreatePending}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
}

export default AddTodo;
