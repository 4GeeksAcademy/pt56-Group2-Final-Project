import React from "react";
import { Link } from "react-router-dom";

//new
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useContext} from "react";

export const Navbar = () => {
	//new
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
					<button className="btn btn-primary" onClick={() => actions.logout(navigate)}>Log out</button>
				</div>
			</div>
		</nav>
	);
};
