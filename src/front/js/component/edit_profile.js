import React, {useContext, useState, useEffect} from "react";
import { Context } from "../store/appContext";
import {useNavigate } from "react-router-dom";


export const EditProfile = ({user}) => {  
  const { store, actions } = useContext(Context);
  const [formValue, setFormValue] = useState({first_name: user?.first_name, last_name: user?.last_name, permanent_location: user?.permanent_location});
  const navigate = useNavigate();


  function onChange(e)  {				
    const id = e.target.id;
    const value = e.target.value;
    setFormValue({...formValue, [id]:value});                    
    }

    return (
      <div className="modal fade" id="editProfileModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Profile</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div className="container">
                  <div className="row m-2">
                      <div className="col">
                          <input onChange={onChange} value={formValue.first_name} type="text" className="form-control" placeholder="First Name" id="first_name" />
                      </div>
                      <div className="col">
                          <input onChange={onChange} value={formValue.last_name} type="text" className="form-control" placeholder="Last Name" id="last_name" />
                      </div>
                  </div>
                  <div className="row m-2 justify-content-center">
                      <div className="col-6">
                          <input onChange={onChange} value={formValue.permanent_location ? formValue.permanent_location : ""} type="text" className="form-control" placeholder="Permanent Location" id="permanent_location" />
                      </div>
                  </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={() => actions.authenticateEditProfile(formValue, navigate)} >Save changes</button>
            </div>
          </div>
        </div>
      </div>

    )
}
