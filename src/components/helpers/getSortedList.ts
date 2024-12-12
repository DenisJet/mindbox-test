import { Todo } from '../../App';

export const getSortedList = (list: Todo[], sort: string) => {
  let sortedList = [...list];

  if (sort === 'Active') sortedList = list.filter((todo) => !todo.isCompleted);
  if (sort === 'Completed') sortedList = list.filter((todo) => todo.isCompleted);

  return sortedList;
};
