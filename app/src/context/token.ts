import { createContext } from 'react';

export type TToken = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const TokenContext = createContext<TToken | null>(null);
