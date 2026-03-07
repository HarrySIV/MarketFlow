import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateAccount.css'
export function CreateAccount() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://your-app.herokuapp.com/api/register', formData);
      navigate('/login'); // Send them to login after registering
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <div className="accountcontainer">
      <h2 className='textcolor'>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input className='textbox' type="text" placeholder="First Name" required
          onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
        <br></br>
        <input className='textbox' type="text" placeholder="Last Name" required
          onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
        <br></br>
        <input className='textbox' type="email" placeholder="Email" required
          onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <br></br>
        <input className='textbox' type="password" placeholder="Password" required
          onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <br></br><br></br>
        <button className='button' type="submit">Register</button>
      </form>
    </div>
  );
}