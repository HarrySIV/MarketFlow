import { createContext } from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Error } from './pages/Error';
import { CreateAccount } from './pages/CreateAccount';

import './App.css';

export function App() {
  const token = localStorage.getItem('marketflow-token');
  const TokenContext = createContext(token);
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
    <TokenContext value={token}>
      <div className="website">
        <BrowserRouter>
          <main>{routes}</main>
        </BrowserRouter>
      </div>
    </TokenContext>
  );
}
