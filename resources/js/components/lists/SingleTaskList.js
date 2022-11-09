import React from 'react';
import AppPagination from "../../layouts/AppPagination";
import {useDispatch, useSelector} from "react-redux";
import NewTaskForm from "../tasks/NewTaskForm";
import {setSelectedTask, setTasks, toggleSidebar} from "../../features/tasks/taskSlice";
import {setAlert} from "../../features/layouts/alertSlice";

function SingleTaskList({currentUser}) {
  const {activeTaskList} = useSelector((state) => state.taskList);
  const {tasks} = useSelector(state => state.task);
  const dispatch = useDispatch();
  const handleClick = (singleTask) => {
    dispatch(setSelectedTask(singleTask));
    dispatch(toggleSidebar(true));
  }
  const handleDeleteTask = (taskId) => {
    axios.delete(`/api/task/${taskId}`).then(res => {
      const {tasks, message, type} = res.data;
      dispatch(setTasks(tasks));
      setAlert({message, type});
    }).catch(err => {
      setAlert({message, type})
    })
  }
  return (
      <div className="col-9 border-1">
        <div className="row">
          <div className="col-10">
            <h4>{currentUser && `${currentUser.name}'s tasks`}</h4>
          </div>
        </div>
        {activeTaskList ?
            <p>{activeTaskList.subtitle}</p> : ''}
        <hr/>
        {activeTaskList ?
            <>
              <ul className="list-group">
                {tasks.data ? tasks.data.map((singleTask, index) => (
                    <li className="list-group-item single-task" key={singleTask.id}>
                      <p className="d-inline-flex" onClick={() => handleClick(singleTask)}>{singleTask.title}</p>
                      <i className="bi bi-x-lg delete-list-btn" onClick={() => handleDeleteTask(singleTask.id)}></i>
                    </li>
                )) : <p>You don't have any tasks yet!</p>}
              </ul>
              <NewTaskForm/>
              <AppPagination/>
            </>
            :
            <p>Please select the list first!</p>}
      </div>
  );
}

export default SingleTaskList;