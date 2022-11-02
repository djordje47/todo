import React from 'react';
import {Link} from "react-router-dom";

function Header(props) {
  return (
      <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div className="container">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
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