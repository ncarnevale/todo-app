import styles from "./App.module.css";
import TodoList from "../TodoList/TodoList";

function App() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>To-Do</h1>
      <TodoList />
    </div>
  );
}

export default App;
