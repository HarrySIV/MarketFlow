import { useEffect, useState } from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

import { AccountContext, type TAccountInfo } from './context/account-context';
import { retrieveToken, storeToken } from './utility/account-token';
import { serverURL } from './utility/environment';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Error } from './pages/Error';
import { CreateAccount } from './pages/CreateAccount';
import { Header } from './components/header/Header';
import { Profile } from './pages/Profile';

import './App.css';

export function App() {
  const [accountInfo, setAccountInfo] = useState<TAccountInfo>({
    firstName: '',
    lastName: '',
    email: '',
    token: '',
  });

  useEffect(() => {
    const fetchData = async (token: string) => {
      const response = await axios.post(`${serverURL}/account/login`, {
        token,
      });
      const data = response.data;
      console.log(data);
      const accountData = {
        firstName: data.account.firstName as string,
        lastName: data.account.lastName as string,
        email: data.account.email as string,
        token: data.token as string,
      };
      setAccountInfo(accountData);
      storeToken(data.token);
    };
    const storedToken = retrieveToken();
    if (storedToken) {
      try {
        fetchData(storedToken);
      } catch (err) {}
    }
  }, []);

  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/error" element={<Error />} />
      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/error" replace />} />
    </Routes>
  );
  return (
    <AccountContext.Provider value={{ accountInfo, setAccountInfo }}>
      <div className="website">
        <BrowserRouter>
          <Header />
          <main>{routes}</main>
        </BrowserRouter>
      </div>
    </AccountContext.Provider>
  );
}
