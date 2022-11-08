import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setTaskLists} from "../../features/taskList/taskListSlice";
import SingleList from "./SingleList";
import SingleTaskList from "./SingleTaskList";
import TaskSidebar from "../tasks/TaskSidebar";

function List(props) {
  const {currentUser} = useSelector((state) => state.user);
  const {selectedTask} = useSelector(state => state.task);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) {
      axios.get(`/api/lists/${currentUser.id}`).then(res => {
        if (res.data.data.length > 0) {
          // dispatch(setActiveTaskList(res.data.data[0]));
          dispatch(setTaskLists(res.data));
        }
      }).catch(err => console.log(err));
    }
  }, []);
  return (
      <div className="container-fluid main">
        <div className={`ant ${selectedTask ? 'sidebar-active' : ''}`}>
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