import { useContext } from 'react';
import { Todo } from '../../App';
import styles from './TodosList.module.css';
import { SortContext } from '../../context/sortContext';
import { getSortedList } from '../helpers/getSortedList';

export default function TodosList({ todos, setComplete }: { todos: Todo[]; setComplete: (todo: string) => void }) {
  const { sort } = useContext(SortContext);

  return (
    <ul className={styles.list}>
      {getSortedList(todos, sort).map((todo) => {
        return (
          <li key={todo.text} className={styles.item} onClick={() => setComplete(todo.text)}>
            <span className={styles.itemCheck}>{todo.isCompleted ? <img src='/icon.svg' alt='Completed' /> : ''}</span>
            {todo.isCompleted ? <del>{todo.text}</del> : <span>{todo.text}</span>}
          </li>
        );
      })}
    </ul>
  );
}
