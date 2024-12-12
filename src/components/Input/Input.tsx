import { useState } from 'react';
import styles from './Input.module.css';

export default function Input({ addTodo }: { addTodo: (newTodo: string) => void }) {
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (newTodo.trim() !== '') {
        addTodo(newTodo);
        setNewTodo('');
      }
    }
  };

  return (
    <div className={styles.container}>
      <img className={styles.icon} src='/icon2.png' alt='icon' />
      <input
        className={styles.input}
        type='text'
        placeholder='What needs to be done? (write here)'
        value={newTodo}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
