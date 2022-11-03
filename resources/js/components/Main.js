import React from 'react';
import ReactDOM from 'react-dom';
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Home from "./Home";
import {Provider, useSelector} from "react-redux";
import {store} from "../store";
import List from "./List";
import ProtectedRoute from "./utils/ProtectedRoute";
import Logout from "./auth/Logout";

function Main() {
  const {user} = useSelector(state => state);
  console.log(user);
  return (
      <Router>
        <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/logout" element={<Logout/>}/>
          <Route exact path="/list" element={
            <ProtectedRoute isAllowed={!!user} redirectPath={'/login'}>
              <List/>
            </ProtectedRoute>
          }/>
        </Routes>
        <Footer/>
      </Router>
  );
}

export default Main;

if (document.getElementById('app')) {
  ReactDOM.render(
      <Provider store={store}>
        <Main/>
      </Provider>,
      document.getElementById('app')
  );
}
