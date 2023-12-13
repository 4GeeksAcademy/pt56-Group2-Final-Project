import React, {useEffect, useContext, useState} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import  "../component/styles.css";
import {SignInMessage} from "./SignInMessage.jsx"

const Friends = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [authStatus, setAuthStatus] = useState(null)


    useEffect(() => {
        const authenticate = async () => {
            setAuthStatus(await actions.authenticateFriends(navigate))
        }
        
        setTimeout(() => {
            authenticate() }, 500)        
    }, [])

    switch(authStatus){
        case true:
            return(
                <div className="container friends-container">
                    <h1>Your Travel Buddies:</h1>
                    <ul class="list-group list-group-flush">
                        {store.friends.map((friend, i) =>
                            //<li class="list-group-item" key={i}>{friend}</li>
                            <li key={i} className="list-group-item row d-flex">
                                <div className="col">											
                                    {friend}																						
                                </div>
                                <div className="col text-end">
                                    <button onClick={() => actions.removeFriend(friend, i, navigate)}>Remove Friend</button>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            )
        case false:
            return (<SignInMessage />)
        
        case null:
            return("")
    }
}

export default Friends