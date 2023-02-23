import React from "react";
import {
  setSelectedTask,
  setTasks,
  toggleCompleted,
  toggleFavorite,
  toggleSidebar
} from "../../features/tasks/taskSlice";
import {setAlert} from "../../features/layouts/alertSlice";
import {useDispatch} from "react-redux";

const SingleTask = ({singleTask}) => {
  const dispatch = useDispatch();
  const handleSelectTask = (singleTask) => {
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
  const formatDueDate = (dueDate) => {
    if (!dueDate) {
      return false;
    }
    const date = new Date(dueDate);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return `${date.toLocaleDateString('sr-RS', options).replace(/ /g, '')}`
  }
  return (
      <li className={`list-group-item single-task ${singleTask.is_completed ? 'completed-task' : ''}`}
          key={singleTask.id}>
        <div className="task">
          <input type="checkbox" className="form-check-input me-1"
                 value={singleTask.is_completed}
                 checked={singleTask.is_completed ? 'checked' : ''}
                 onChange={e => handleToggleCompleted(e.target.value, singleTask.id)}/>
          <label className="form-check-label" onClick={() => handleSelectTask(singleTask)}
                 htmlFor="firstCheckbox">{singleTask.title}</label>
          {singleTask.subtitle &&
              <small className="task-subtitle ml-3 fst-italic">({singleTask.subtitle})</small>}
        </div>
        <div className="actions">
          <div className="badge text-white bg-primary">
            {singleTask.due_date && <span>{formatDueDate(singleTask.due_date)}</span>}
          </div>
          <i className={singleTask.is_favorite ? 'bi bi-star-fill text-warning delete-list-btn' : 'bi bi-star delete-list-btn'}
             onClick={() => handleToggleFavorite(singleTask.id)}></i>
          <i className="bi bi-x-lg text-danger delete-list-btn ms-2"
             onClick={() => handleDeleteTask(singleTask.id)}></i>
        </div>
      </li>
  )
}
export default SingleTask;