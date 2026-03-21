import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { serverURL } from '../utility/environment';

import './css/CreateAccount.css';

export function CreateAccount() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios
        .post(`${serverURL}/account/create-account`, formData)
        .then(function (response) {
          console.log(response);
        });
      navigate('/login'); // Send them to login after registering
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  return (
    <div className="accountcontainer">
      <h1 className="textcolor">MarketFlow</h1>
      <div className="createcontainer">
        <h2 className="textcolor">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="createtextbox"
            type="text"
            placeholder="First Name"
            required
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          &nbsp;
          <input
            className="createtextbox"
            type="text"
            placeholder="Last Name"
            required
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <br></br>
          <br></br>
          <input
            className="createtextbox"
            type="email"
            placeholder="Email"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          &nbsp;
          <input
            className="createtextbox"
            type="password"
            placeholder="Password"
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <br></br>
          <br></br>
          <button className="accountbutton" type="submit">
            Register
          </button>
          &emsp;&emsp;&emsp;&emsp;&emsp;
          <a href="/Login">Return to Login</a>
        </form>
      </div>
    </div>
  );
}
