import React from "react";
import { Link } from "react-router-dom";

// "Link" paths just written are just for reference, should be changed later
export const LoggedInNavbar = () => {
	return (
		<nav className="navbar navbar-light bg-light border-bottom">
			<div className="container-fluid">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Logo</span>
				</Link>
				<div className="ml-auto">
                    <Link to="/search">
                        <span>Search</span>
                    </Link>
                </div>
                <div className="ml-auto">
                    <Link to="/friends">
                        <span>Friends</span>
                    </Link>
                </div>
                <div className="ml-auto">
                    <Link to="/myposts">
                        <span>My Posts</span>
                    </Link>
                </div>
                <div className="ml-auto">
					<Link to="/addfriend">
						<button className="btn btn-outline-primary">Add Friend</button>
					</Link>
                </div>
                <div className="ml-auto">
                    <Link to="/newpost">
						<button className="btn btn-outline-primary">New Post</button>
					</Link>
                </div>
                <div className="ml-auto">
                    <Link to="/logout">
						<button className="btn btn-outline-danger">Logout</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};