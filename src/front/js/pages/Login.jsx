import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = () => {
  const { store, actions } = useContext(Context);
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const [authStatus, setAuthStatus] = useState(true)
  const [ isAlertVisible, setIsAlertVisible ] = useState(false);



  function onChange(e) {
    const id = e.target.id;
    const value = e.target.value;
    setFormValue({ ...formValue, [id]: value });
  }

  // useEffect(() => {
  //   console.log("AUTH STATUS:", authStatus)
  //   if (!authStatus) {
  //     setIsAlertVisible(true);
  //     setTimeout(() => {
  //       setIsAlertVisible(false);
  //     }, 2000); // Set the duration here (in milliseconds), e.g., 3000ms = 3 seconds
  //   }
  // }, [authStatus]);

  const handleLogin = async () => {
    let result  = await actions.login(formValue, navigate)
    if (result == false){
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 2000)
    }
  }

   
      return (
        <div className="container login-container mt-5">
          <form className="row g-3 border border-lightgray bg-light">
            <div className="py-2 bg-light border-bottom border-lightgray mt-0 text-center">
              <h2>Login</h2>
            </div>
            {isAlertVisible && (
              <div className="alert alert-danger" role="alert">
                Incorrect email or password. Please try again.
              </div>
            )}
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
            <div className="col-md-12">
              {/* Link to the forgotpassword page */}
              <Link to="/forgotpassword">Forgot Password?</Link>
            </div>
            <br />
            <br />
            <button
              type="button"
              // Assuming 'actions' is defined elsewhere in your code
              // and contains the 'login' function
              onClick={() => handleLogin()}
              className="btn btn-primary"
            >
              Login
            </button>
          </form>
        </div>
      );

  
};
export default Login;
