import React, {useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
// import  "../component/styles.css";

const AddFriend = () => {
    const { store, actions } = useContext(Context);
    const [formValue, setFormValue] = useState({first_name: "", last_name: "", email: ""})
    const navigate = useNavigate();

    useEffect(() => {
        function authenticate() {
            actions.authenticateUser(navigate);
        }
        setTimeout(() => {
            authenticate() }, 500)        
    }, [])

    function onChange(e)  {				
        const id = e.target.id;
        const value = e.target.value;
        setFormValue({...formValue, [id]:value});
                            
    }
    return (
        <div className="container mt-5 add-friend-container">
          <form className="row g-3 border border-lightgray">
            <div className="py-2 bg-light border-bottom border-lightgray mt-0 text-center">
              <h2>Add A Travel Buddy</h2>
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
                placeholder="Enter friend's email"
                id="email"
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                onChange={onChange}
                value={formValue.first_name}
                type="text"
                className="form-control"
                placeholder="Enter friend's first name"
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
                placeholder="Enter friend's last name"
                id="last_name"
              />
            </div>
            <button
              type="button"
              onClick={() => actions.addFriend(formValue, navigate)}
              className="btn btn-primary"
            >
              Add Travel Buddy
            </button>
          </form>
        </div>
      );
    };
    

export default AddFriend;