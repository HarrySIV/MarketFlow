import { useEffect, useState } from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';

import { AccountContext, type TAccountInfo } from './context/account-context';
import { retrieveToken, storeToken } from './utility/account-token';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Error } from './pages/Error';
import { CreateAccount } from './pages/CreateAccount';

import './App.css';
import axios from 'axios';
import { serverURL } from './utility/environment';
import { Header } from './components/header/Header';
import { Profile } from './pages/Profile';

export function App() {
  const [accountInfo, setAccountInfo] = useState<TAccountInfo | null>(null);

  useEffect(() => {
    const fetchData = async (token: string) => {
      const response = await axios.post(`${serverURL}/account/login`, {
        token: token,
      });
      const data = response.data;
      const newToken = data.token;
      const accountData = {
        firstName: data.firstName as string,
        lastName: data.lastName as string,
        email: data.email as string,
        token: data.token as string,
      };
      setAccountInfo(accountData);
      storeToken(newToken);
      console.log(accountData, newToken);
    };
    const storedToken = retrieveToken();
    console.log(storedToken);
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
