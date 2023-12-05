import React, {useEffect, useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


const Feed = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        function authenticate() {
            actions.authenticateFeed(navigate);
        }
        setTimeout(() => {
            authenticate() }, 500)        
    }, [])

    return (
        <div className="container text-center">
            <h1>Feed</h1>
            {store.feed!= null ?
                store.feed.map((item,index) => {
                    return(
                        <div key={index} className="mb-5">
                            <h2>Username: {item.user_id}</h2>
                            <h2>Stay: {item.stay}</h2>
                            <h2>Food/Drinks: {item.food_drinks}</h2>
                            <h2>Activities: {item.activities}</h2>
                            <h2>Transportation: {item.transportation}</h2>
                            <h2>Tips: {item.tips}</h2>                                                        
                        </div>
                    );
                })                
                :
                ''
            }
        </div>
    );
}

export default Feed;