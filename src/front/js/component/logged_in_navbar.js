import React from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext} from "react";

// "Link" paths just written are just for reference, should be changed later
export const LoggedInNavbar = () => {
    const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light border-bottom">
			<div className="container-fluid">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Logo</span>
				</Link>
                {!store.token ? 
                    <>
                        <Link to="/login">
                            <button className="btn btn-primary me-1">Login</button>
                        </Link>
                        <Link to="/signup">
                            <button className="btn btn-primary">Signup</button>
                        </Link>
                    </>
                    :
                        <>
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
                        <Link to="/profile">
                            <span>My Profile</span>
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
                        <Link to="/">
                            <button className="btn btn-outline-danger" onClick={() => actions.logout(navigate)}>Logout</button>
                        </Link>
                    </div>
                    </>
                }				
			</div>
		</nav>
	);
};