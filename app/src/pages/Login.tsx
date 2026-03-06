import { useState } from 'react';

export function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input 
        type="email" 
        placeholder="Email" 
        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
      />
      <input 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
      />
      <button onClick={() => console.log("Logging in...", loginData)}>
        Login
      </button>
    </div>
  );
}