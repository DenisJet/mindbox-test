import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { Todo } from './App';

const mockSetItem = jest.fn();
const mockGetItem = jest.fn();

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: mockGetItem,
    setItem: mockSetItem,
  },
});

describe('App component', () => {
  beforeEach(() => {
    mockGetItem.mockClear();
    mockSetItem.mockClear();
  });

  it('renders Input, TodosList, and Footer components', () => {
    render(<App />);

    expect(screen.getByPlaceholderText('What needs to be done? (write here)')).toBeInTheDocument();
    expect(screen.getByText('Clear completed')).toBeInTheDocument();
  });

  it('should add a new todo', () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText('What needs to be done? (write here)') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'New Todo' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText('New Todo')).toBeInTheDocument();
    expect(mockSetItem).toHaveBeenCalledWith('todos', JSON.stringify([{ text: 'New Todo', isCompleted: false }]));
  });

  it('should mark a todo as completed', () => {
    const todos: Todo[] = [
      { text: 'Test Todo 1', isCompleted: false },
      { text: 'Test Todo 2', isCompleted: false },
    ];
    mockGetItem.mockReturnValueOnce(JSON.stringify(todos));

    render(<App />);

    const todoItem = screen.getByText('Test Todo 1');
    fireEvent.click(todoItem);

    expect(mockSetItem).toHaveBeenCalledWith(
      'todos',
      JSON.stringify([
        { text: 'Test Todo 1', isCompleted: true },
        { text: 'Test Todo 2', isCompleted: false },
      ])
    );
  });

  it('should clear completed todos', () => {
    const todos: Todo[] = [
      { text: 'Test Todo 1', isCompleted: true },
      { text: 'Test Todo 2', isCompleted: false },
    ];
    mockGetItem.mockReturnValueOnce(JSON.stringify(todos));

    render(<App />);

    const clearButton = screen.getByText('Clear completed');
    fireEvent.click(clearButton);

    expect(screen.queryByText('Test Todo 1')).not.toBeInTheDocument();
    expect(mockSetItem).toHaveBeenCalledWith('todos', JSON.stringify([{ text: 'Test Todo 2', isCompleted: false }]));
  });

  it('should load todos from localStorage on initial render', () => {
    const todosFromStorage: Todo[] = [
      { text: 'Test Todo 1', isCompleted: false },
      { text: 'Test Todo 2', isCompleted: true },
    ];
    mockGetItem.mockReturnValueOnce(JSON.stringify(todosFromStorage));

    render(<App />);

    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });
});
