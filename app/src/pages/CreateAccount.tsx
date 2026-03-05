import { useState } from 'react';
import axios from 'axios';

export function CreateAccount() {
    const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
    });

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // This sends the data to your Node/Express backend
      const response = await axios.post('https://your-app-name.herokuapp.com/api/register', formData);
      alert("Record Created in MongoDB!");
      console.log(response.data);
    } catch (err) {
      console.error("Error creating account", err);
    }
    };
    return (
    <div className="form-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          onChange={(e) => setFormData({...formData, username: e.target.value})} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}