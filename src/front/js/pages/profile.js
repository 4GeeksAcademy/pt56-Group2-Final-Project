import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { EditProfile } from "../component/edit_profile";


export const Profile = () => {
    const {store, actions} = useContext(Context)
    let user = store.users.find((item) => item.id == sessionStorage.getItem("userID"))
    //useEffect here to check if there is a user, if not redirect to login page
    return (
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
                    <h1>{user?.first_name} {user?.last_name}</h1>
                </div>
            </div>
            <div className="row m-2 text-center">
                <h3>Permanent Location</h3>
            </div>
            <div className="row d-flex justify-content-around">
                <div className="card m-3" style={{width : "25rem"}}>
                    <div className="card-header">
                        <strong>Places I've been:</strong>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Miami</li>
                        <li className="list-group-item">Rome</li>
                        <li className="list-group-item">San Francisco</li>
                    </ul>
                    <div className="row card-footer justify-content-center">
                        <button type="button" className="btn btn-info">Add New Place</button>                
                    </div>
                </div>
                <div className="card m-3 mr-0" style={{width : "25rem"}}>
                    <div className="card-header">
                        <strong>Places I want to go:</strong>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Paris</li>
                        <li className="list-group-item">Milan</li>
                        <li className="list-group-item">Shanghai</li>
                    </ul>
                    <div className="row card-footer justify-content-center">
                        <button type="button" className="btn btn-info">Add New Place</button>                
                    </div>
                </div>
            </div>
            <EditProfile />
        </div>
    )
}