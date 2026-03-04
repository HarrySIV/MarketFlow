import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Error } from './pages/Error';

import './App.css';

export function App() {
  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/error" element={<Error />} />
    </Routes>
  );
  return (
    <>
      <div className="website">
        <BrowserRouter>
          <main>{routes}</main>
        </BrowserRouter>
      </div>
    </>
  );
}
