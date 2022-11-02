import React from 'react';
import ReactDOM from 'react-dom';
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Home from "./Home";
import {Provider} from "react-redux";
import {store} from "../store";
import List from "./List";

function Main() {
  return (
      <Router>
        <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/list" element={<List/>}/>
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
