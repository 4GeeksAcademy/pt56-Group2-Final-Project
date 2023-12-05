import React, { useState, useEffect } from 'react';

const MyPosts = () => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setUserPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>My Posts</h1>
      <ul>
        {userPosts.map(post => (
          <li key={post.id}>
            <h2>Location: {post.location}</h2>
            <p>Stay: {post.stay}</p>
            <p>Food: {post.food}</p>
            <p>Recreational: {post.activities}</p>
            <p>Transportation: {post.transportation}</p>
            <p>Comments: {post.comments}</p>
            <img src={post.media} alt="Post Media" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPosts;