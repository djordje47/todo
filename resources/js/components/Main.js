import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Home from "./Home";
import {Provider, useSelector} from "react-redux";
import {persistor, store} from "../store";
import List from "./lists/List";
import ProtectedRoute from "./utils/ProtectedRoute";
import Logout from "./auth/Logout";
import {PersistGate} from "redux-persist/integration/react";
import Alert from "../layouts/Alert";
import TaskSidebar from "./tasks/TaskSidebar";

function Main() {
  const {currentUser} = useSelector(state => state.user);
  const {alerts} = useSelector(state => state.alert);
  return (
      <Router>
        <Header/>
        <div className="row justify-content-center align-content-center align-items-center m-4">
          <div className="col-6">
            {alerts && <Alert/>}
          </div>
        </div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/logout" element={<Logout/>}/>
          <Route exact path="/list" element={
            <ProtectedRoute isAllowed={!!currentUser} redirectPath={'/login'}>
              <List/>
            </ProtectedRoute>
          }/>
          <Route exact path="/list/:listId" element={
            <ProtectedRoute isAllowed={!!currentUser} redirectPath={'/login'}>
              <List/>
            </ProtectedRoute>
          }/>
        </Routes>
        <Footer />
      </Router>
  );
}

export default Main;

if (document.getElementById('app')) {
  ReactDOM.render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Main/>
        </PersistGate>
      </Provider>,
      document.getElementById('app')
  );
}
