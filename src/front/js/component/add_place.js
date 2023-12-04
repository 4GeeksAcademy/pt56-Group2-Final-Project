import React, {useContext, useState} from "react";
import { Context } from "../store/appContext";
import {useNavigate } from "react-router-dom";


export const AddPlace = ({typeOfList}) => {  
  const { store, actions } = useContext(Context);

  const UpdateList = () => {
    const placeInput = document.getElementById('place_input');
    const placeValue = placeInput.value;
    console.log(placeValue)
    if (typeOfList=="Places I've been"){
      actions.addVisitedPlace(store.user, placeValue)
    }
    else if( typeOfList=="Places I want to go"){
      actions.addWishlistPlace(store.user, placeValue)
    }
    else{
      console.log("an error occurred")
    }
  }
  return (
    <div class="modal fade" id="addPlaceModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">{typeOfList}</h1>
            <h3 class="modal-title fs-5" id="exampleModalLabel">Add a Place</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <div className="container">
                  <div className="row m-2">
                    <div className="col">
                        <input  type="text" className="form-control" placeholder="Add a place" id="place_input" />
                    </div>
                  </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onClick={() => UpdateList()}>Save changes</button>
        </div>
      </div>
    </div>
  </div>
  )
}
