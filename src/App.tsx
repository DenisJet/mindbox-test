import styles from './App.module.css';
import Input from './components/Input/Input';
import TodosList from './components/TodosList/TodosList';
import { useEffect, useState } from 'react';
import { SortContextProvider } from './context/sortProvider';
import Footer from './components/Footer/Footer';

export type Todo = {
  text: string;
  isCompleted: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  const addTodo = (newTodo: string) => {
    if (todos.find((todo) => todo.text.toLowerCase() === newTodo.toLowerCase())) {
      alert('Todo already exist');
      return;
    }
    const newTodos = [...todos, { text: newTodo, isCompleted: false }];
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const setComplete = (completeTodo: string) => {
    const updatedTodos = todos.map((todo) => (todo.text === completeTodo ? { ...todo, isCompleted: true } : todo));
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.isCompleted);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  return (
    <SortContextProvider>
      <main className={styles.todo}>
        <h1 className={styles.title}>todos</h1>
        <div className={styles.container}>
          <Input addTodo={addTodo} />
          {todos && <TodosList todos={todos} setComplete={setComplete} />}
          <Footer todos={todos} clearCompleted={clearCompleted} />
        </div>
      </main>
    </SortContextProvider>
  );
}

export default App;
