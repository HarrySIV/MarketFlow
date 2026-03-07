import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'
export function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const handleCreate = ()=> {
    navigate('/createaccount')
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://your-app.herokuapp.com/api/login', loginData);
      if (response.status === 200) {
        navigate('/'); // Redirect to Home
      }
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="logincontainer">
      <h2 className="textcolor">Login</h2>
      <form onSubmit={handleLogin}>
        <input className='textbox' type="email" placeholder="Email" required
          onChange={(e) => setLoginData({...loginData, email: e.target.value})} />
        <br></br>
        <input className='textbox' type="password" placeholder="Password" required
          onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
        <br></br>  <br></br>
        <button className='button' type="submit">Login</button>
         <br></br>
        <a className='create' onClick={handleCreate}>Create Account</a>
      </form>
    </div>
  );
}