import { useEffect, useState } from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';

import { TokenContext } from './context/token';
import { retrieveToken } from './utility/account-token';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Error } from './pages/Error';
import { CreateAccount } from './pages/CreateAccount';

import './App.css';

export function App() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(retrieveToken());
  }, []);

  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Navigate to="/error" replace />} />
      <Route path="/createaccount" element={<CreateAccount />} />
    </Routes>
  );
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <div className="website">
        <BrowserRouter>
          <main>{routes}</main>
        </BrowserRouter>
      </div>
    </TokenContext.Provider>
  );
}
