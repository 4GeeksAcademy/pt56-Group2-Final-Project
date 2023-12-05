import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
    const [location, setLocation] = useState("");
    const [stay, setStay] = useState("");
    const [food, setFood] = useState("");
    const [activities, setActivities] = useState("");
    const [transportation, setTransportation] = useState("");
    const [comments, setComments] = useState("");
    const [media, setMedia] = useState(null);

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };

    const handleStayChange = (e) => {
        setStay(e.target.value);
    };

    const handleFoodChange = (e) => {
        setFood(e.target.value);
    };

    const handleActivitiesChange = (e) => {
        setActivities(e.target.value);
    };

    const handleTransportationChange = (e) => {
        setTransportation(e.target.value);
    };

    const handleCommentsChange = (e) => {
        setComments(e.target.value);
    };

    const handleMediaChange = (e) => {
        const file = e.target.files[0];
        setMedia(file);
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('location', location);
        formData.append('stay', stay);
        formData.append('food', food);
        formData.append('activities', activities);
        formData.append('transportation', transportation);
        formData.append('comments', comments);
        formData.append('media', media);

        try {
            const response = await fetch('https://verbose-space-parakeet-pjr79g4rx766367x9-3001.app.github.dev/api/createpost', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Post submitted successfully');
                navigate('/MyPosts');
            } else {
                console.error('Failed to submit post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Create New Post</h1>
            <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Location:</label>
                        <input type="text" className="form-control" value={location} onChange={handleLocationChange} />
                    </div>
                    <div className="mb-3">
                        <label>Stay:</label>
                        <input type="text" className="form-control" value={stay} onChange={handleStayChange} />
                    </div>
                    <div className="mb-3">
                        <label>Food:</label>
                        <input type="text" className="form-control" value={food} onChange={handleFoodChange} />
                    </div>
                    <div className="mb-3">
                        <label>Activities:</label>
                        <input type="text" className="form-control" value={activities} onChange={handleActivitiesChange} />
                    </div>
                    <div className="mb-3">
                        <label>Transportation:</label>
                        <input type="text" className="form-control" value={transportation} onChange={handleTransportationChange} />
                    </div>
                    <div className="mb-3">
                        <label>Tips/Advice/Comments:</label>
                        <input type="text" className="form-control" value={comments} onChange={handleCommentsChange} />
                    </div>
                    <div className="mb-3">
                        <label>Media:</label>
                        <input type="file" className="form-control" accept="image/*" onChange={handleMediaChange} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewPost;

