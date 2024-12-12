import { ReactNode, useState } from 'react';
import { SortContext } from './sortContext';

export const SortContextProvider = ({ children }: { children: ReactNode }) => {
  const [sort, setSort] = useState('All');

  return <SortContext.Provider value={{ sort, setSort }}>{children}</SortContext.Provider>;
};
