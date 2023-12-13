import React, {useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";
import {useNavigate } from "react-router-dom";

const Signup = () => {    
    const { store, actions } = useContext(Context);
    const [formValue, setFormValue] = useState({first_name: "", last_name: "", email: "", password: ""});
    const navigate = useNavigate();

    const [authStatus, setAuthStatus] = useState(true)
    const [ isAlertVisible, setIsAlertVisible ] = useState(false);

    function onChange(e)  {				
        const id = e.target.id;
        const value = e.target.value;
        setFormValue({...formValue, [id]:value});
                            
    }

    const handleSignup = async () => {
      let result  = await actions.signUp(formValue, navigate)
      if (result == false){
        setIsAlertVisible(true);
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 2000)
      }
    }

    return(
        <div className="container signup-container mt-5">
        <form className="row g-3 border border-lightgray bg-light">
          <div className="py-2 bg-light border-bottom border-lightgray mt-0 text-center">
            <h2>Sign Up</h2>
          </div>
          {isAlertVisible && (
              <div className="alert alert-danger" role="alert">
                User already exists. Please use a different email.
              </div>
            )}
          <div className="col-md-12">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <input
              onChange={onChange}
              value={formValue.first_name}
              type="text"
              className="form-control"
              placeholder="Enter your first name"
              id="first_name"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              onChange={onChange}
              value={formValue.last_name}
              type="text"
              className="form-control"
              placeholder="Enter your last name"
              id="last_name"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              onChange={onChange}
              value={formValue.email}
              type="email"
              className="form-control"
              placeholder="Enter email"
              id="email"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onChange={onChange}
              value={formValue.password}
              type="password"
              className="form-control"
              placeholder="Enter password"
              id="password"
            />
          </div>
          <button
            type="button"
            onClick={() => handleSignup()}
            className="btn btn-primary"
          >
            Signup
          </button>
        </form>
      </div>
    );
}

export default Signup