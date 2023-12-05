import React, {useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const MyPosts = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    // Fetch posts when the component mounts
    actions.getPosts();
  }, []);

  console.log("Posts in store:", store.posts); // Add this line to check the posts in the console

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">My Posts</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <ul className="list-group">
            {store.posts.map((post) => (
              <li key={post.id} className="list-group-item">
                <h3>{post.location}</h3>
                <p>Stay: {post.stay}</p>
                <p>Food: {post.food}</p>
                <p>Activities: {post.activities}</p>
                <p>Transportation: {post.transportation}</p>
                <p>Comments: {post.comments}</p>
                {post.media && <img src={post.media} alt="Post Media" className="img-fluid" />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;