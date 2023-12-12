import React, { useEffect } from "react";
import "../component/styles.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

const LandingPage = () => {
  useEffect(() => {
    
    const carousel = new window.bootstrap.Carousel(document.getElementById('carouselExample'), {
      interval: 7000, 
    });

    carousel.cycle();

    return () => {
      carousel.dispose();
    };
  }, []);

  return (
    <div className="container landing-container">
      <div className="welcome-text">
        <h1>Welcome to Travel Buddy</h1>
        <p>Our mission is to help you get the best out of your travel experiences!</p>
        <p>We understand that relying on Google and Yelp reviews from strangers to plan your trip can be hard to trust. Here, you don't have to worry about that!</p>
        <p>Check out reviews and tips from people you know and trust so you can plan the best vacation that you know you will enjoy!</p>
        <p>Plus, you get to show off all of your cool trips and help your friends out too by creating your own posts for them to check out!</p>
        <p>Have a look at some of our members' posts below:</p>
      </div>
      <div id="carouselExample" className="carousel slide w-100 mx-auto">
        <div className="carousel-inner custom-carousel">
          <div className="carousel-item active">
            <div className="d-flex justify-content-around">
              <img src="https://i.ibb.co/7Rjw3xS/media.png" className="d-block w-25" alt="..." />
              <img src="https://i.ibb.co/p2n9WBG/media.png" className="d-block w-25" alt="..." />
              <img src="https://i.ibb.co/NSrnc1q/media.png" className="d-block w-25" alt="..." />
            </div>
          </div>
          <div className="carousel-item">
            <div className="d-flex justify-content-around">
              <img src="https://i.ibb.co/sF3Mnrk/media.png" className="d-block w-25" alt="..." />
              <img src="https://i.ibb.co/Wgky5qL/media.png" className="d-block w-25" alt="..." />
              <img src="https://i.ibb.co/7C0DyG8/media.png" className="d-block w-25" alt="..." />
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
export default LandingPage;
