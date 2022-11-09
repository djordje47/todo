import React from 'react';
import AppPagination from "../../layouts/AppPagination";
import {useDispatch, useSelector} from "react-redux";
import NewTaskForm from "../tasks/NewTaskForm";
import {
  setSelectedTask,
  setTasks,
  toggleCompleted,
  toggleFavorite,
  toggleSidebar
} from "../../features/tasks/taskSlice";
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
  const handleToggleFavorite = (taskId) => {
    axios.put(`/api/task/toggle-favorite/${taskId}`).then(res => {
      dispatch(toggleFavorite(res.data.task_id));
    }).catch(err => {
      console.log(err)
    });
  }
  const handleToggleCompleted = (isCompleted, taskId) => {
    axios.put(`/api/task/toggle-completed/${taskId}`).then(res => {
      dispatch(toggleCompleted(res.data.task_id));
    }).catch(err => {
      console.log(err)
    });
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
                      <div className="task">
                        <input type="checkbox" className="form-check-input me-1"
                               value={singleTask.is_completed}
                               checked={singleTask.is_completed ? 'checked' : ''}
                               onChange={e => handleToggleCompleted(e.target.value, singleTask.id)}/>
                        <label className="form-check-label" onClick={() => handleClick(singleTask)}
                               htmlFor="firstCheckbox">{singleTask.title}</label>
                      </div>
                      <div className="actions">
                        <i className={singleTask.is_favorite ? 'bi bi-star-fill text-warning delete-list-btn' : 'bi bi-star delete-list-btn'}
                           onClick={() => handleToggleFavorite(singleTask.id)}></i>
                        <i className="bi bi-x-lg text-danger delete-list-btn ms-2"
                           onClick={() => handleDeleteTask(singleTask.id)}></i>
                      </div>
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