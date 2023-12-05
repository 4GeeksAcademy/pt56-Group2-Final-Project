import React, {useEffect, useContext, useState} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const AddFriend = () => {
    const { store, actions } = useContext(Context);
    const [formValue, setFormValue] = useState({user_id: user?.id, friend_id: null});
    const navigate = useNavigate();

    const [add_friend_loading, add_friend_setLoading] = useState(true);

    useEffect(() => {
      async function loadUsers() {
          await actions.getUsers();
          add_friend_setLoading(false); // Set loading to false after friends are loaded
      }
      setTimeout(() => {
          loadUsers();
      }, 1000);
  }, []);

    function onChange(e)  {				
      const id = e.target.id;
      const email_value = e.target.value;
      let friend_user = store.users.find(item => item.email === email_value)
      setFormValue({...formValue, [id]:friend_user.id});                    
      }
  
      return (
        <div class="modal fade" id="addFriendModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Friend</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              {add_friend_loading ? (<p>Loading friends...</p>):
              (
                <>
              <div class="modal-body">
                <div className="container">
                    <div className="row m-2">
                        <div className="col">
                            <input onChange={onChange} value={formValue.friend_id} type="text" className="form-control" placeholder="Enter your friend's email" id="friend_id" />
                        </div>
                    </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onClick={() => actions.addFriend(formValue, navigate)} >Save changes</button>
              </div>
              </>)
              }
            </div>
          </div>
        </div>
  
      )
    
}
