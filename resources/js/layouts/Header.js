import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import Logout from "../components/auth/Logout";

function Header(props) {
  const {currentUser} = useSelector((state) => state.user);
  return (
      <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div className="container">
          <Link to="/">Home</Link>
          {!currentUser && <Link to="/login">Login</Link>}
          {!currentUser && <Link to="/register">Register</Link>}
          {currentUser && <Link to="/list">List</Link>}
          {currentUser && <Logout/>}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="#">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
  );
}

export default Header;