import { render, screen, fireEvent } from '@testing-library/react';
import Footer from './Footer';
import { SortContext } from '../../context/sortContext';
import { Todo } from '../../App';
import { getSortedList } from '../helpers/getSortedList';
import '@testing-library/jest-dom';

jest.mock('../helpers/getSortedList', () => ({
  getSortedList: jest.fn(),
}));

const mockSetSort = jest.fn();
const mockClearCompleted = jest.fn();

const todos: Todo[] = [
  { text: 'Test todo 1', isCompleted: false },
  { text: 'Test todo 2', isCompleted: true },
];

describe('Footer component', () => {
  beforeEach(() => {
    mockSetSort.mockClear();
    mockClearCompleted.mockClear();
    (getSortedList as jest.Mock).mockReturnValue(todos);
  });

  it('renders correctly', () => {
    render(
      <SortContext.Provider value={{ sort: 'All', setSort: mockSetSort }}>
        <Footer todos={todos} clearCompleted={mockClearCompleted} />
      </SortContext.Provider>
    );

    expect(screen.getByText('items left')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Clear completed')).toBeInTheDocument();
  });

  it('calls setSort when sorting buttons are clicked', () => {
    render(
      <SortContext.Provider value={{ sort: 'All', setSort: mockSetSort }}>
        <Footer todos={todos} clearCompleted={mockClearCompleted} />
      </SortContext.Provider>
    );

    const allButton = screen.getByRole('button', { name: 'All' });
    const activeButton = screen.getByRole('button', { name: 'Active' });
    const completedButton = screen.getByRole('button', { name: 'Completed' });

    fireEvent.click(activeButton);
    expect(mockSetSort).toHaveBeenCalled();

    fireEvent.click(completedButton);
    expect(mockSetSort).toHaveBeenCalled();

    fireEvent.click(allButton);
    expect(mockSetSort).toHaveBeenCalled();
  });

  it('calls clearCompleted when "Clear completed" is clicked', () => {
    render(
      <SortContext.Provider value={{ sort: 'All', setSort: mockSetSort }}>
        <Footer todos={todos} clearCompleted={mockClearCompleted} />
      </SortContext.Provider>
    );

    const clearButton = screen.getByText('Clear completed');
    fireEvent.click(clearButton);
    expect(mockClearCompleted).toHaveBeenCalled();
  });

  it('sets sort to "All" when "Clear completed" is clicked and sort is "Completed"', () => {
    render(
      <SortContext.Provider value={{ sort: 'Completed', setSort: mockSetSort }}>
        <Footer todos={todos} clearCompleted={mockClearCompleted} />
      </SortContext.Provider>
    );

    const clearButton = screen.getByText('Clear completed');
    fireEvent.click(clearButton);

    expect(mockSetSort).toHaveBeenCalledWith('All');
  });

  it('applies active class to the current sort button', () => {
    render(
      <SortContext.Provider value={{ sort: 'Active', setSort: mockSetSort }}>
        <Footer todos={todos} clearCompleted={mockClearCompleted} />
      </SortContext.Provider>
    );

    expect(screen.getByText('Active')).toHaveClass('active');
    expect(screen.getByText('All')).not.toHaveClass('active');
    expect(screen.getByText('Completed')).not.toHaveClass('active');
  });
});
