import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {unsetAuthenticatedUser} from "../../features/user/userSlice";
import {setAlert} from "../../features/layouts/alertSlice";

function Logout(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    axios.post('/api/logout')
    .then((res) => {
      dispatch(unsetAuthenticatedUser());
      dispatch(setAlert(res.data));
      navigate('/login');
    })
    .catch((err) => {
      console.log(err);
    });
  }
  return (
      <Link to={'/logout'} onClick={event => handleClick(event)}>Logout</Link>
  )
}

export default Logout;