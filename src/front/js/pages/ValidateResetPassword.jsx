import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ValidateResetPassword = () => {
  const [tokenValid, setTokenValid] = useState(true);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
        } else {
          setTokenValid(false);
        }
      } catch (error) {
        console.error('Error validating reset token:', error);
        setTokenValid(false);
      }
    };

    validateToken();
  }, [token]);

  return (
    <div>
      <h2>Validate Reset Password</h2>
      {tokenValid ? (
        <p>Token is valid. You can proceed with resetting the password.</p>
      ) : (
        <p>Invalid or expired token. Please request a new password reset link.</p>
      )}
    </div>
  );
};

export default ValidateResetPassword;
