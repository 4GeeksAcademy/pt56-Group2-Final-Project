import React, {useContext, useState} from "react";
import { Context } from "../store/appContext";
import {useNavigate } from "react-router-dom";

const Signup = () => {    
    const { store, actions } = useContext(Context);
    const [formValue, setFormValue] = useState({username: "", email: "", password: ""});
    const navigate = useNavigate();

    function onChange(e)  {				
        const id = e.target.id;
        const value = e.target.value;
        setFormValue({...formValue, [id]:value});
                            
    }
    return(
        <div className="container mt-5">
                <form className="row g-3 border border-lightgray">
                    <div className="py-2 bg-light border-bottom border-lightgray mt-0 text-center">
                        <h2 >Signup</h2>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input onChange={onChange} value={formValue.username} type="text" className="form-control" placeholder="Enter username" id="username" />
                    </div>                    
                    <div className="col-md-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input onChange={onChange} value={formValue.email} type="email" className="form-control" placeholder="Enter email" id="email" />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input onChange={onChange} value={formValue.password} type="password" className="form-control" placeholder="Enter password" id="password" />
                    </div>
                    <button type="button" onClick={() => actions.signUp(formValue, navigate)} className="btn btn-primary">Signup</button>                      
                </form>
            </div>
    );
}

export default Signup