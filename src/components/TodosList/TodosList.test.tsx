import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodosList from './TodosList';
import { SortContext } from '../../context/sortContext';
import { Todo } from '../../App';
import { getSortedList } from '../helpers/getSortedList';

jest.mock('../helpers/getSortedList', () => ({
  getSortedList: jest.fn(),
}));

describe('TodosList component', () => {
  const mockSetComplete = jest.fn();
  const todos: Todo[] = [
    { text: 'Test Todo 1', isCompleted: false },
    { text: 'Test Todo 2', isCompleted: true },
  ];

  beforeEach(() => {
    mockSetComplete.mockClear();
    (getSortedList as jest.Mock).mockReturnValue(todos);
  });

  it('renders the todo items correctly', () => {
    render(
      <SortContext.Provider value={{ sort: 'All', setSort: jest.fn() }}>
        <TodosList todos={todos} setComplete={mockSetComplete} />
      </SortContext.Provider>
    );

    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  it('displays a completed todo with a strikethrough', () => {
    render(
      <SortContext.Provider value={{ sort: 'All', setSort: jest.fn() }}>
        <TodosList todos={todos} setComplete={mockSetComplete} />
      </SortContext.Provider>
    );

    const completedTodo = screen.getByText('Test Todo 2');
    expect(completedTodo).toHaveTextContent('Test Todo 2');
    expect(completedTodo).toBeInTheDocument();
    expect(completedTodo).toContainHTML('<del>Test Todo 2</del>');
  });

  it('displays an icon for completed todo', () => {
    render(
      <SortContext.Provider value={{ sort: 'All', setSort: jest.fn() }}>
        <TodosList todos={todos} setComplete={mockSetComplete} />
      </SortContext.Provider>
    );

    const completedIcon = screen.getByAltText('Completed');
    expect(completedIcon).toBeInTheDocument();
  });

  it('calls setComplete when a todo is clicked', () => {
    render(
      <SortContext.Provider value={{ sort: 'All', setSort: jest.fn() }}>
        <TodosList todos={todos} setComplete={mockSetComplete} />
      </SortContext.Provider>
    );

    const todoItem = screen.getByText('Test Todo 1');
    fireEvent.click(todoItem);

    expect(mockSetComplete).toHaveBeenCalledWith('Test Todo 1');
  });
});
