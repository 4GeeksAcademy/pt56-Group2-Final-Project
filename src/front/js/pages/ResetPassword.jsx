import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [tokenValid, setTokenValid] = useState(true);
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
                alert(data.message); 
                navigate('/login');
            } else {
                const errorData = await response.json();
                alert(`Failed to reset password: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            {tokenValid ? (
                <>
                    <label>New Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button onClick={handleResetPassword}>Reset Password</button>
                </>
            ) : (
                <p>Invalid or expired token. Please request a new password reset link.</p>
            )}
        </div>
    );
};

export default ResetPassword;
