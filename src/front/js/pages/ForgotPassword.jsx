import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../component/styles.css';

    const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState(''); 
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
            setAlertMessage('Password reset link sent to your email.');
            setAlertType('success');
            setTimeout(() => {
              navigate('/login');
            }, 2000);
          } else {
            setAlertMessage('Failed to send reset link, please verify your email address is correct.');
            setAlertType('danger');
          }
        } catch (error) {
          console.error('Error sending the password reset link:', error);
          setAlertMessage('An error occurred. Please try again later.');
          setAlertType('danger');
        }
      };

      return (
        <div className="forgot-password-container">
          <h2 className="forgot-password-title">Forgot Password</h2>
          <label className="forgot-password-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="forgot-password-input"
          />
          <button onClick={handleForgotPassword} className="forgot-password-button">
            Send Reset Link
          </button>

          {alertMessage && (
            <div className={`alert alert-${alertType}`} role="alert">
              {alertMessage}
            </div>
          )}
        </div>
      );
    };

    export default ForgotPassword;