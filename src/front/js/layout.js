import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";

// new line
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Feed from "./pages/Feed.jsx";
import NewPost from "./pages/NewPost.jsx"; // Adjust the import path

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { LoggedInNavbar } from "./component/logged_in_navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <LoggedInNavbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Login />} path="/login" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<LandingPage />} path="/landing" />
            <Route element={<Feed />} path="/feed" />
            <Route element={<NewPost />} path="/newpost" /> 
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
