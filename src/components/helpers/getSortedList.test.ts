import { getSortedList } from './getSortedList';
import { Todo } from '../../App';

describe('getSortedList function', () => {
  const todos: Todo[] = [
    { text: 'Test todo 1', isCompleted: false },
    { text: 'Test todo 2', isCompleted: true },
    { text: 'Test todo 3', isCompleted: false },
    { text: 'Test todo 4', isCompleted: true },
  ];

  it('should return all todos when sort is "All"', () => {
    const result = getSortedList(todos, 'All');
    expect(result).toEqual(todos);
  });

  it('should return only active todos when sort is "Active"', () => {
    const result = getSortedList(todos, 'Active');
    expect(result).toEqual([
      { text: 'Test todo 1', isCompleted: false },
      { text: 'Test todo 3', isCompleted: false },
    ]);
  });

  it('should return only completed todos when sort is "Completed"', () => {
    const result = getSortedList(todos, 'Completed');
    expect(result).toEqual([
      { text: 'Test todo 2', isCompleted: true },
      { text: 'Test todo 4', isCompleted: true },
    ]);
  });

  it('should return an empty array when there are no todos to match the sort condition', () => {
    const result = getSortedList([], 'Active');
    expect(result).toEqual([]);
  });
});
