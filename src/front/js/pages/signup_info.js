import React, {useContext, useState} from "react";
import { Context } from "../store/appContext";
import {useNavigate } from "react-router-dom";

//NEED EDIT PROFILE ROUTE TO ADD THIS INFO TO USER PROFILE
const SignupInfo = () => {    
    const { store, actions } = useContext(Context);
    const [formValue, setFormValue] = useState({first_name: "", last_name: "", permanent_location: "", visited_places: "", wishlist_places: ""});
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
                        <h2 >Fill out your profile info!</h2>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="FirstName" className="form-label">First Name</label>
                        <input onChange={onChange} value={formValue.first_name} type="text" className="form-control" placeholder="Enter your first name" id="FirstName" />
                    </div>                    
                    <div className="col-md-12">
                        <label htmlFor="LastName" className="form-label">Last Name</label>
                        <input onChange={onChange} value={formValue.last_name} type="text" className="form-control" placeholder="Enter your last name" id="LastName" />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="PermLocat" className="form-label">Permanent Location</label>
                        <input onChange={onChange} value={formValue.permanent_location} type="text" className="form-control" placeholder="Enter your permanent location" id="PermLocat" />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="VisitedPlaces" className="form-label">Where have you been?</label>
                        <input onChange={onChange} value={formValue.visited_places} type="text" className="form-control" placeholder="Enter a comma separated list" id="VisitedPlaces" />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="WishPlaces" className="form-label">Where do you want to go?</label>
                        <input onChange={onChange} value={formValue.wishlist_places} type="text" className="form-control" placeholder="Enter a comma separated list" id="WishPlaces" />
                    </div>
                    <button type="button" onClick={() => actions.signUp(formValue, navigate)} className="btn btn-primary">Signup</button>                      
                </form>
            </div>
    );
}

export default Signup