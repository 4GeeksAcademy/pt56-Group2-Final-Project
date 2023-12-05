import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";

const MyPosts = () => {
  const { store, actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    actions.getPosts().then(() => {
      setIsLoading(false);
    });
  }, [actions]);

  console.log("Posts in store:", store.posts);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">My Posts</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
                    <img src={post.media} alt="Post Media" className="img-fluid" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
