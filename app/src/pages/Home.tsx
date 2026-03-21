import { useContext } from 'react';

import { Product } from '../components/Product';
import { AccountContext } from '../context/account-context';

import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

import './css/Home.css';

export function Home() {
  const accountInfo = useContext(AccountContext);
  const navigate = useNavigate();
  return (
    <>
      <h1 className="login-text">
        {accountInfo?.accountInfo?.firstName
          ? 'Welcome, ' + accountInfo?.accountInfo.firstName
          : 'Please login'}
      </h1>
      {accountInfo?.accountInfo?.firstName ? null : (
        <Button name="Login" onClick={() => navigate('/login')} />
      )}
      <div className="bg">
        <h1>Home</h1>
        <div>
          <Product />
        </div>
      </div>
    </>
  );
}
