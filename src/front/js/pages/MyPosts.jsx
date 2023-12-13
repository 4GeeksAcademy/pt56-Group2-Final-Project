import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import  "../component/styles.css";

const MyPosts = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();


  // console.log("Posts in store:", store.posts);
  useEffect(() => {
    function authenticate() {
        actions.authenticatePosts(navigate);
        console.log("POSTS:", store.friends)
    }
    setTimeout(() => {
        authenticate() }, 500)        
  }, [])

  return (
    <div className="container mt-4 my-posts-container">
      <h1 className="text-center mb-4">My Posts</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <ul className="list-group">
              {store.posts.map((post) => (
                <li key={post.id} className="list-group-item">
                  <h3>Location: {post.place_name}</h3>
                  <p>Stay: {post.stay}</p>
                  <p>Food: {post.food_drinks}</p>
                  <p>Activities: {post.activities}</p>
                  <p>Transportation: {post.transportation}</p>
                  <p>Tips: {post.tips}</p>
                  {post.media && (
                    <img src={post.media} alt="media" className="img-fluid" />
                  )}
                  <Link to={`/comments/${post.id}`}>
						          <button className="btn btn-outline-primary">Comments</button>
					        </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
    </div>
  );
};

export default MyPosts;
