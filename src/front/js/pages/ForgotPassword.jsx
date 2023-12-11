import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/forgotpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      console.log('Forgot Password Response:', response);
      
      if (response.ok) {
        alert('Password reset link sent to your email.');
        navigate('/login');
      } else {
        alert('Failed to send password reset link.');
      }
    } catch (error) {
      console.error('Error sending password reset link:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleForgotPassword}>Send Reset Link</button>
    </div>
  );
};

export default ForgotPassword;