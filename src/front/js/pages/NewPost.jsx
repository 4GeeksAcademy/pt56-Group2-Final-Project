import React, { useState, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import  "../component/styles.css";

const NewPost = () => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const [post, setPost] = useState({
    place_name: "",
    stay: "",
    food_drinks: "",
    activities: "",
    transportation: "",
    tips: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const inputValue = type === "file" ? e.target.files[0] : value;
    setPost({ ...post, [name]: inputValue });
  };

  const ref = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = { ...post, media: ref.current.files[0] };
    let formData = new FormData();

    for (let key in updatedPost) {
      formData.append(key, updatedPost[key]);
    }

    actions.addNewPost(formData, navigate);


  };



  return (
    <div className="container new-post-container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Create A New Post</h1>
          <h3 className="text-center mb-4">Let your friends know where you've been and what's good!</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Location:</label>
              <input type="text" className="form-control" name="place_name" value={post.place_name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Stay:</label>
              <input type="text" className="form-control" name="stay" value={post.stay} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Food:</label>
              <input type="text" className="form-control" name="food_drinks" value={post.food} onChange={handleInputChange} />
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
              <label>Tips:</label>
              <textarea className="form-control" name="tips" value={post.tips} onChange={handleInputChange}></textarea>
            </div>
            <div className="form-group">
              <label>Media:</label>
              <input type="file" className="form-control-file" name="media" accept="image/*" ref={ref} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
