import React from 'react';
import {setTaskNotes, setTaskSubtitle, setTaskTitle, updateTask} from "../../features/tasks/taskSlice";
import {setAlert} from "../../features/layouts/alertSlice";
import {useDispatch, useSelector} from "react-redux";

function UpdateTaskForm(props) {
  const {selectedTask} = useSelector(state => state.task);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`/api/task/${selectedTask.id}`, {
      id: selectedTask.id,
      title: selectedTask.title,
      subtitle: selectedTask.subtitle,
      notes: selectedTask.notes
    }).then(res => {
      console.log(res)
      const {updatedTask, message} = res.data;
      dispatch(updateTask(updatedTask));
      dispatch(setAlert({message, type: 'success'}));
    }).catch(err => {
      console.log(err)
    });
  }
  return (
      <form className="d-grid" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group my-2">
          <label htmlFor="title">Title</label>
          <input className="form-control" name="title"
                 value={selectedTask.title ?? ''}
                 onChange={(e) => dispatch(setTaskTitle(e.target.value))}/>
        </div>
        <div className="form-group my-2">
          <label htmlFor="subtitle">Subtitle</label>
          <input className="form-control" name="subtitle"
                 value={selectedTask.subtitle ?? ''}
                 onChange={(e) => dispatch(setTaskSubtitle(e.target.value))}/>
        </div>
        <div className="form-group my-2">
          <label htmlFor="due_date">Due Date</label>
          <input type="datetime-local" className="form-control" name="due_date"/>
        </div>
        <div className="form-group my-2">
          <label htmlFor="notes">Notes</label>
          <textarea className="form-control"
                    value={selectedTask.notes ?? ''}
                    rows={10}
                    name="notes"
                    onChange={(e) => dispatch(setTaskNotes(e.target.value))}/>
        </div>
        <div className="form-group my-2">
          <label htmlFor="steps">Steps</label>
          {selectedTask.steps ?
              <>
                <ul className="list-group">
                  {selectedTask.steps.map((step, index) =>
                      <li className="list-group-item" key={index}>
                        <input type="checkbox" name="step-completed" checked={step.completed ? "checked" : ''}
                               className="form-check-input me-1"/>
                        <label className="form-check-label" htmlFor="step-completed">
                          {step.step}
                        </label>
                      </li>
                  )}
                </ul>
              </> : ''}
          <div className="input-group my-3">
            <input type="text" className="form-control" name="steps" placeholder="New step.."/>
            <button className="btn btn-outline-success btn-sm">Create</button>
          </div>
        </div>
        <button className="btn btn-success">Update Task</button>
      </form>
  );
}

export default UpdateTaskForm;