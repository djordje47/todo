import React from 'react';
import {Link, useNavigate} from "react-router-dom";

function Logout(props) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    axios.post('/api/logout')
    .then((res) => {
      console.log(res.data)
      navigate('/');
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