import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const [post, setPost] = useState({
    location: "",
    stay: "",
    food: "",
    activities: "",
    transportation: "",
    comments: "",
    media: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const inputValue = type === "file" ? e.target.files[0] : value;
    setPost({ ...post, [name]: inputValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.addNewPost(post, navigate);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">New Post</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Location:</label>
              <input type="text" className="form-control" name="location" value={post.location} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Stay:</label>
              <input type="text" className="form-control" name="stay" value={post.stay} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Food:</label>
              <input type="text" className="form-control" name="food" value={post.food} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Activities:</label>
              <input type="text" className="form-control" name="activities" value={post.activities} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Transportation:</label>
              <input type="text" className="form-control" name="transportation" value={post.transportation} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Comments:</label>
              <textarea className="form-control" name="comments" value={post.comments} onChange={handleInputChange}></textarea>
            </div>
            <div className="form-group">
              <label>Media:</label>
              <input type="file" className="form-control-file" name="media" accept="image/*" onChange={handleInputChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
