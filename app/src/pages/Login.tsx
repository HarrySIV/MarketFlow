import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { serverURL } from '../utility/environment';
import { AccountContext } from '../context/account-context';
import { storeToken } from '../utility/account-token';

import './css/Login.css';

export function Login() {
  const accountInfo = useContext(AccountContext);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${serverURL}/account/login`,
        loginData,
      );
      const data = response.data.account;
      storeToken(response.data.token);
      accountInfo?.setAccountInfo!({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        token: data.token,
      });
      if (response.status === 200) {
        navigate('/'); // Redirect to Home
      }
    } catch (err) {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="logincontainer">
      <h2 className="textcolor">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="logintextbox"
          type="email"
          placeholder="Email"
          required
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
        />
        <br></br>
        <br></br>
        <input
          className="logintextbox"
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <br></br>
        <br></br>&emsp;&emsp;&emsp;&emsp;&emsp;
        <button className="button" type="submit">
          Login
        </button>
        <br></br>&emsp;&emsp;&emsp;
        <a href="/CreateAccount">Create an Account</a>
      </form>
    </div>
  );
}
