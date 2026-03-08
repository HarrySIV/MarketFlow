import { useContext } from 'react';

import { Product } from '../components/Product';
import { AccountContext } from '../context/account-context';

import './Home.css';

export function Home() {
  const accountInfo = useContext(AccountContext);
  return (
    <>
      <h1 className="login-text">
        {accountInfo?.accountInfo?.firstName
          ? 'Welcome, ' + accountInfo?.accountInfo.firstName
          : 'Please login'}
      </h1>
      <div className="bg">
        <h1>Home!!</h1>
        <div>
          <Product />
        </div>
      </div>
    </>
  );
}
