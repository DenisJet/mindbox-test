import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';

describe('Input component', () => {
  const mockAddTodo = jest.fn();

  beforeEach(() => {
    mockAddTodo.mockClear(); // Очищаем mock-функцию перед каждым тестом
  });

  it('should update input value when typed', () => {
    render(<Input addTodo={mockAddTodo} />);

    const inputElement = screen.getByPlaceholderText('What needs to be done? (write here)') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'New Todo' } });

    expect(inputElement).toHaveValue('New Todo');
  });

  it('should call addTodo with correct value when Enter is pressed', () => {
    render(<Input addTodo={mockAddTodo} />);

    const inputElement = screen.getByPlaceholderText('What needs to be done? (write here)') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'New Todo' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(mockAddTodo).toHaveBeenCalledWith('New Todo');
  });

  it('should clear input field after adding todo', () => {
    render(<Input addTodo={mockAddTodo} />);

    const inputElement = screen.getByPlaceholderText('What needs to be done? (write here)') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'New Todo' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(inputElement).toHaveValue('');
  });

  it('should not call addTodo if input is empty', () => {
    render(<Input addTodo={mockAddTodo} />);

    const inputElement = screen.getByPlaceholderText('What needs to be done? (write here)') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    expect(mockAddTodo).not.toHaveBeenCalled();
  });
});
