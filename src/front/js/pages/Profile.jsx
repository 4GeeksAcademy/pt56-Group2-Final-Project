import React, {useEffect, useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        function authenticate() {
            actions.authenticateUser(navigate);
        }
        setTimeout(() => {
            authenticate() }, 500)        
    }, [])

    return (
        <div className="container text-center">
            <h1>User Informtation</h1>
            {store.user!= null ?
                <div >
                    <h2>Username: {store.user.username}</h2>
                    <h2>Email: {store.user.email}</h2>
                    <h2>Id: {store.user.id}</h2>
                    <h2>First Name: {store.user.first_name}</h2>
                    <h2>Last Name: {store.user.last_name}</h2>
                    <h2>Permanent location: {store.user.permanent_location}</h2>
                </div>
                :
                ''
            }
        </div>
    );
}

export default Profile;