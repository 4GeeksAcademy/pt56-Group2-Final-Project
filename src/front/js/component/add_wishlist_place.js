import React, {useContext, useState} from "react";
import { Context } from "../store/appContext";
import {useNavigate } from "react-router-dom";


export const AddWishlistPlace = (list) => {  
  //list has to be either "wishlist_places" or "visited_places"
  const { store, actions } = useContext(Context);
  const [formValue, setFormValue] = useState({wishlist_places: [], visited_places: []});
  const navigate = useNavigate();

  function onChange(e)  {				
    const id = e.target.id;
    const value = e.target.value;
    //trying to add a place to exisiting list. trying to do it for both (wishlist and visited) in the same component using list variable/parameter.
    setFormValue({...formValue, [id]:[value]});                    
    }

    return (
      <div class="modal fade" id="addPlaceModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Add a Place</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div className="container">
                    <div className="row m-2">
                      <div className="col">
                          <input onChange={onChange} value={formValue.list} type="text" className="form-control" placeholder="Add a place" id={list} />
                      </div>
                    </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" >Save changes</button>
          </div>
        </div>
      </div>
    </div>

    )
}
