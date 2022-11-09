import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setTaskLists} from "../../features/taskList/taskListSlice";
import SingleList from "./SingleList";
import SingleTaskList from "./SingleTaskList";
import TaskSidebar from "../tasks/TaskSidebar";

function List(props) {
  const {currentUser} = useSelector((state) => state.user);
  const {isSidebarToggled} = useSelector(state => state.task);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) {
      axios.get('/api/task-list').then(res => {
        const {userLists} = res.data;
        dispatch(setTaskLists(userLists));
      }).catch(err => console.log(err));
    }
  }, []);
  return (
      <div className="container-fluid main">
        <div className={`ant ${isSidebarToggled ? 'sidebar-active' : ''}`}>
          <div className="row m-4">
            <SingleList currentUser={currentUser}/>
            <SingleTaskList currentUser={currentUser}/>
          </div>
        </div>
        <TaskSidebar/>
      </div>
  );
}

export default List;