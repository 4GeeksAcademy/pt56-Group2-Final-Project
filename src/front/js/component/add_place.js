import React, {useContext, useState} from "react";
import { Context } from "../store/appContext";
import {useNavigate } from "react-router-dom";


export const AddPlace = ({typeOfList}) => {  
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();


  const UpdateList = () => {
    const placeInput = document.getElementById('place_input');
    const placeValue = placeInput.value;
    actions.authenticateAddPlace(typeOfList, placeValue, navigate)
  }

  return (
    <div className="modal fade" id="addPlaceModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{typeOfList}</h1>
            <h3 className="modal-title fs-5" id="exampleModalLabel">Add a Place</h3>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <div className="container">
                  <div className="row m-2">
                    <div className="col">
                        <input  type="text" className="form-control" placeholder="Add a place" id="place_input" />
                    </div>
                  </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary" onClick={() => UpdateList()}>Save changes</button>
        </div>
      </div>
    </div>
  </div>
  )
}
