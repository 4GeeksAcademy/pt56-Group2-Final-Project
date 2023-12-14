import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

    const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [tokenValid, setTokenValid] = useState(true);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState(''); 
    const navigate = useNavigate();
    const location = useLocation();

        useEffect(() => {
            const searchParams = new URLSearchParams(location.search);
            const token = searchParams.get('token');

            const validateToken = async () => {
            try {
                const validateResponse = await fetch(`${process.env.BACKEND_URL}/api/validatepasswordresettoken`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
                });

                if (validateResponse.ok) {
                setTokenValid(true);
                console.log('Token validation successful:', token);
                } else {
                setTokenValid(false);
                console.error('Token validation failed:', validateResponse.statusText);
                }
            } catch (error) {
                console.error('Error validating reset token:', error);
                setTokenValid(false);
            }
            };

            if (token) {
            validateToken();
            } else {
            setTokenValid(false);
            }

            // Cleanup function
            return () => {
            };
        }, [location.search]);

        useEffect(() => {
            const timeoutId = setTimeout(() => {
            setAlertMessage('');
            setAlertType('');
            }, 2000);

            // Cleanup function
            return () => clearTimeout(timeoutId);
        }, [alertMessage, alertType]);

        const showAlert = (message, type) => {
            setAlertMessage(message);
            setAlertType(type);
        };

        const handleResetPassword = async () => {
            try {
            const searchParams = new URLSearchParams(location.search);
            const token = searchParams.get('token');
        
            const response = await fetch(`${process.env.BACKEND_URL}/api/resetpassword`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password }),
            });
        
            if (response.ok) {
                const data = await response.json();
                showAlert(data.message, 'success');
        
                
                setTimeout(() => {
                navigate('/login');
                }, 2000);
            } else {
                const errorData = await response.json();
                console.log('Error data:', errorData);
                showAlert(`Failed to reset password: Please request a new link ${errorData.message || ''}`, 'danger');
            }
            } catch (error) {
            console.error('Error resetting password:', error);
            showAlert('An error occurred. Please try again later.', 'danger');
            }
        };

        return (
            <div className="reset-password-container">
            <h2 className="reset-password-title">Reset Password</h2>
            {tokenValid ? (
                <>
                <label>New Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label>Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button onClick={handleResetPassword} className="reset-password-button">
                    Reset Password
                </button>
                </>
            ) : (
                <p className="reset-password-message">Invalid or expired token. Please request a new password reset link.</p>
            )}

            {alertMessage && (
                <div className={`alert alert-${alertType}`} role="alert">
                {alertMessage}
                </div>
            )}
            </div>
        );
        };

        export default ResetPassword;
