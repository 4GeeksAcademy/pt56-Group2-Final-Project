import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const SignInMessage = () => {
  return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        You must be signed in to perform this action.{' '}
        <Link to="/login" className="alert-link">
          Click here to sign in.
        </Link>
      </div>
    </div>
  );
};

