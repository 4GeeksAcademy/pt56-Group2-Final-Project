import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";


export const EditProfile = () => {
    return (
      <div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Profile</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div className="container">
                  <div className="row m-2">
                      <div className="col">
                          <input type="text" className="form-control" placeholder="First name" aria-label="First name"/>
                      </div>
                      <div className="col">
                          <input type="text" className="form-control" placeholder="Last name" aria-label="Last name"/>
                      </div>
                  </div>
                  <div className="row m-2 justify-content-center">
                      <div className="col-6">
                          <input type="text" className="form-control" placeholder="Location" aria-label="Location"/>
                      </div>
                  </div>
                  <div className="row my-2 justify-content-center">
                      <div className="col-2">
                          <button type="button" className="btn btn-success">Submit</button>
                      </div>
                  </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

    )
}