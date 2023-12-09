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
      <div className="container text-center feed-container">
        <br></br>
      <h1>Latest from your Travel Buddies</h1>
      {store.feed != null ? (
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <ul className="list-group">
                {store.feed.map((item, index) => (
                  <li key={item.id} className="list-group-item">
                    <h3>{item.name}</h3>
                    <h3>Location: {item.place_name}</h3>                    
                    <p>Stay: {item.stay}</p>
                    <p>Food: {item.food_drinks}</p>
                    <p>Activities: {item.activities}</p>
                    <p>Transportation: {item.transportation}</p>
                    <p>Tips: {item.tips}</p>
                    {item.media && (
                      <img
                        src={item.media}
                        alt="media"
                        className="img-fluid"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
    );


}

export default Feed;