import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { serverURL } from '../utility/environment';

export function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverURL}/login`, loginData);
      if (response.status === 200) {
        navigate('/'); // Redirect to Home
      }
    } catch (err) {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
