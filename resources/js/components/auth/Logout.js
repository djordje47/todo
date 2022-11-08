import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {unsetAuthenticatedUser} from "../../features/user/userSlice";
import {setAlert} from "../../features/layouts/alertSlice";
import {setTasks} from "../../features/tasks/taskSlice";
import {setTaskLists} from "../../features/taskList/taskListSlice";

function Logout(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    axios.post('/api/logout')
    .then((res) => {
      dispatch(unsetAuthenticatedUser());
      dispatch(setAlert(res.data));
      dispatch(setTasks([]));
      dispatch(setTaskLists([]));
      navigate('/login');
    })
    .catch((err) => {
      console.log(err);
    });
  }
  return (
      <Link to={'/logout'} onClick={event => handleClick(event)} className="nav-link">Logout</Link>
  )
}

export default Logout;