import React, { useState, useContext, useRef } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


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
    // media: null,
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

    //    y {
    //       if (post.media) {
    //         // const mediaUrl = await uploadMediaToImgBB(post.media);
    //  tr
    //         const updatedPost = { ...post, media: ref.current.files[0] };
    //         console.log(updatedPost)

    //         actions.addNewPost(updatedPost, navigate);
    //       } else {
    //         actions.addNewPost(post, navigate);
    //       }
    //     } catch (error) {
    //       console.error("Error during submission:", error);
    //     }
  };

  // const uploadMediaToImgBB = async () => {
  //   const formData = new FormData();
  //   formData.append("image", post.media);

  //   try {
  //     const response = await fetch("https://api.imgbb.com/1/upload?key=a4164c53da6c55c20d8544a12de89add", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error("Error uploading media to ImgBB");
  //     }

  //     const responseData = await response.json();
  //     return responseData.data.url; 
  //   } catch (error) {
  //     console.error("Error:", error);
  //     throw error;
  //   }
  // };


  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">New Post</h1>
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
