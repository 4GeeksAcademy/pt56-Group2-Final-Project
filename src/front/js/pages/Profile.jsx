import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { EditProfile } from "../component/edit_profile";
import {AddPlace} from "../component/add_place"

//NEED EDIT PROFILE ROUTE TO ADD VISITIED/WISHLIST PLACES AND TO EDIT PROFILE
const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [typeOfList, setTypeOfList ] = useState("")

    useEffect(() => {
        function authenticate() {
            actions.authenticateUser(navigate);
        }
        setTimeout(() => {
            authenticate()
        }, 500)
    }, [])

    return (
        <div className="container text-center">
            {store.user != null ?
                <div className="container">
                    <div className="row justify-content-end">
                        <div className="col-3 m-2">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProfileModal">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                    <div className="row text-center ">
                        <div className="col">
                            <h1>{store.user?.first_name ?? "N/A"} {store.user?.last_name ?? "N/A"}</h1>
                        </div>
                    </div>
                    <div className="row m-2 text-center">
                        <h3>{store.user?.permanent_location ?? "N/A"}</h3>
                    </div>
                    <div className="row d-flex justify-content-around">
                        <div className="card m-3" style={{ width: "25rem" }}>
                            <div className="card-header">
                                <strong>Places I've been:</strong>
                            </div>
                            <ul className="list-group list-group-flush">
                                {store.user.places_visited? store.user.places_visited.map((place, i) => <li className="list-group-item" key={i}>{place}</li>) : "N/A"}
                            </ul>
                            <div className="row card-footer justify-content-center">
                                <button onClick={()=>setTypeOfList("Places I've been")} type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#addPlaceModal">
                                    Add New Place
                                </button>
                            </div>
                        </div>
                        <div className="card m-3 mr-0" style={{ width: "25rem" }}>
                            <div className="card-header">
                                <strong>Places I want to go:</strong>
                            </div>
                            <ul className="list-group list-group-flush">
                                {store.user.wishlist_places? store.user.wishlist_places.map((place, i) => <li className="list-group-item" key={i}>{place}</li>) : "N/A"}
                            </ul>
                            <div className="row card-footer justify-content-center">
                                <button onClick={()=>setTypeOfList("Places I want to go")} type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#addPlaceModal">Add New Place</button>
                            </div>
                        </div>
                    </div>
                    <EditProfile user={store.user} />
                    <AddPlace typeOfList={typeOfList}/>
                </div>
                :
                "back to login"
            }
        </div>
    );
}

export default Profile;