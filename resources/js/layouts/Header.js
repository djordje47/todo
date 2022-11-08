import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import Logout from "../components/auth/Logout";

function Header(props) {
  const {currentUser} = useSelector((state) => state.user);
  return (
      <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand d-flex justify-content-center align-items-center align-content-center" href="#">
            <img src="/img/ant.jpg" alt="Logo" width="100" height="80"
                 className="d-inline-block align-text-top"/>
            Little Ant
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                  aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              {currentUser && <li className="nav-item">
                <Link to="/list" className="nav-link">List</Link>
              </li>}
              {!currentUser && <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>}
              {!currentUser && <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>}
              {currentUser && <li className="nav-item">
                <Logout/>
              </li>}
            </ul>
          </div>
        </div>
      </nav>
  );
}

export default Header;