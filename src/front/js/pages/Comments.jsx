import React, {useEffect, useContext, useState} from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link} from "react-router-dom";
import "../../styles/comments.css";

const Comments = () => {
    const params = useParams();
    const { store, actions } = useContext(Context);
    const postid = parseInt(params.postid);
    const [comment, setComment] = useState("");
    
    useEffect(() => {
        async function authenticate() {
           actions.authenticateComments(postid);
        }
        setTimeout(() => {
            authenticate() }, 500)        
    }, [])

    function onChange(e)  {				
        setComment(e.target.value);        
                            
      }

    function handleSubmit(event) {
        event.preventDefault();
        actions.addComments(comment, postid);
        console.log(comment, postid, store["user"].id);
        setComment("");
    }
    
    return(
        <div className="container text-center feed-container">
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <ul className="list-group">
                        {store.comments.map((item, index) => (
                            <>
                            <li key={index} className="list-group-item">
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
                            <div className="comments">
                            <h3 className="comments-title">Comments</h3>
                            <div className="comment-form-title">Write comment</div>
                            <form onSubmit={handleSubmit}>
                                <textarea className="comment-form-textarea" onChange={(e) => onChange(e)} value={comment}/>
                                <button className="comment-form-button">Submit</button>
                            </form>
                            <div className="comments-container">                        
                                {item.comments.map((comment, index) => (                                    
                                    <div key={comment.id} className="comment">                                                                    
                                        <div className="comment-right-part">
                                            <div className="comment-content">
                                                <div className="comment-author">{comment.author_name}</div>
                                            </div>
                                            <div className="comment-text">{comment.comment}</div>
                                            <div className="comment-actions">
                                                {comment.author === store.user.id ? <div className="comment-action" onClick={() => actions.deleteComment(comment.id)}>Delete</div> : ""}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        </>
                        ))}
                        </ul>                
                    </div>
                </div>
            </div>                       
        </div>
    );
};

export default Comments;