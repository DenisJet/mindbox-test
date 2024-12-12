import { createContext } from 'react';

interface SortContextType {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}

export const SortContext = createContext<SortContextType>({ sort: 'All', setSort: () => {} });
