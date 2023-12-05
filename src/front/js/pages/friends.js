import React, {useEffect, useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


const Friends = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        function authenticate() {
            actions.authenticateUser(navigate);
        }
        setTimeout(() => {
            authenticate() }, 500)        
    }, [])

    return(
        <div>
            <h1>Friends</h1>
            {store.friends.filter(pair => {
                pair.includes(store.user.username)
            })}
        </div>
    )

}