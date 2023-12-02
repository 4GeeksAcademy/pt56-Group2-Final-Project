import React from "react";

const LandingPage = () => {
    return (
        <>           
            <div id="carouselExample" className="carousel slide w-50 mx-auto ">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://cdn.pixabay.com/photo/2017/09/04/16/58/passport-2714675_640.jpg" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://cdn.pixabay.com/photo/2017/09/04/16/58/passport-2714675_640.jpg" className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://cdn.pixabay.com/photo/2017/09/04/16/58/passport-2714675_640.jpg" className="d-block w-100" alt="..."/>
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
            <div>
                <h1>About Us:</h1>
                <p>description of what we're doing and brief explanation of why (benefits from this)</p>
            </div>
        </>
    );
};

export default LandingPage;