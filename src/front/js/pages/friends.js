import React, {useEffect, useContext, useState} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import {AddFriend} from "../component/add_friend"


const Friends = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();
    const [friends_loading, friends_setLoading] = useState(false);
    const [user_loading, user_setLoading] = useState(false);


    useEffect(() => {
        async function authenticate() {
            await actions.authenticateUser(navigate);
            user_setLoading(true)
        }
        setTimeout(() => {
            authenticate() }, 500)        
    }, [])

    useEffect(() => {
        async function loadFriends() {
            await actions.getFriends();
            friends_setLoading(true); // Set loading to false after friends are loaded
        }
        setTimeout(() => {
            loadFriends();
        }, 1000);
    }, []);

    return(
        <div className="container">
            {/* <div className="col-3 m-2">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addFriendModal">
                    Add Friend
                </button>
            </div> */}
        <h1>My Friends</h1>
        {friends_loading && user_loading? (
            <ul className="list-group">
                {store.friends.map((pair, i) => {
                    console.log("USER:", store.user)
                    if (pair.user_id === store.user.id) {
                        return <li className="list-group-item" key={i}>{pair.friend_name}</li>
                    }
                    return "not working";
                })}
            </ul>
        ):
        (
            <p>Loading friends...</p>
        ) 
        }
    </div>
    );
    // <AddFriend/>
};

export default Friends;