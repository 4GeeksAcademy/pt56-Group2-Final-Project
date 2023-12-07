import React, {useEffect, useContext, useState} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Friends = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [f_loading, f_setLoading] = useState(true);
    const [u_loading, u_setLoading] = useState(true);


    useEffect(() => {
        function authenticate() {
            actions.authenticateFriends(navigate);
            console.log("FRIENDS:", store.friends)
        }
        setTimeout(() => {
            authenticate() }, 500)        
    }, [])


    return(
        <div className="container">
            <h1>Friends:</h1>
            <ul class="list-group list-group-flush">
                {store.friends.map((friend, i) =>
                    <li class="list-group-item" key={i}>{friend}</li>
                )}
            </ul>
        </div>

    )
}

export default Friends