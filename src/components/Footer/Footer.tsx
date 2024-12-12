import { MouseEvent, useContext } from 'react';
import styles from './Footer.module.css';
import { SortContext } from '../../context/sortContext';
import { Todo } from '../../App';
import { getSortedList } from '../helpers/getSortedList';

export default function Footer({ todos, clearCompleted }: { todos: Todo[]; clearCompleted: () => void }) {
  const { sort, setSort } = useContext(SortContext);

  const changeSort = (e: MouseEvent<HTMLButtonElement>) => {
    setSort(e.currentTarget.innerText);
  };

  const handleClearCompleted = () => {
    clearCompleted();
    if (sort === 'Completed') setSort('All');
  };

  return (
    <div className={styles.footer}>
      <p className={styles.items}>
        <span>{getSortedList(todos, sort).length}</span> items left
      </p>
      <div className={styles.sort}>
        <button
          className={sort === 'All' ? `${styles.button} ${styles.active}` : styles.button}
          type='button'
          onClick={changeSort}
        >
          All
        </button>
        <button
          className={sort === 'Active' ? `${styles.button} ${styles.active}` : styles.button}
          type='button'
          onClick={changeSort}
        >
          Active
        </button>
        <button
          className={sort === 'Completed' ? `${styles.button} ${styles.active}` : styles.button}
          type='button'
          onClick={changeSort}
        >
          Completed
        </button>
      </div>
      <button className={`${styles.button} ${styles.clear}`} type='button' onClick={handleClearCompleted}>
        Clear completed
      </button>
    </div>
  );
}
