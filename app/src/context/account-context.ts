import { createContext } from 'react';

export type TAccountInfo = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  token: string | null;
};
export type TAccountContext = {
  accountInfo: TAccountInfo;
  setAccountInfo: React.Dispatch<React.SetStateAction<TAccountInfo>> | null;
};

export const AccountContext = createContext<TAccountContext>({
  accountInfo: { firstName: '', lastName: '', email: '', token: '' },
  setAccountInfo: null,
});
