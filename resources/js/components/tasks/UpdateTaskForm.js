import React, {useState} from 'react';
import {setTaskDueDate, setTaskNotes, setTaskSubtitle, setTaskTitle, updateTask} from "../../features/tasks/taskSlice";
import {setAlert} from "../../features/layouts/alertSlice";
import {useDispatch, useSelector} from "react-redux";
import DateTimePicker from 'react-datetime-picker';

function UpdateTaskForm(props) {
  const [due_date, setDueDate] = useState(new Date());
  const {selectedTask} = useSelector(state => state.task);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`/api/task/${selectedTask.id}`, {
      id: selectedTask.id,
      title: selectedTask.title,
      subtitle: selectedTask.subtitle,
      notes: selectedTask.notes,
      due_date: selectedTask.due_date
    }).then(res => {
      const {updatedTask, message} = res.data;
      dispatch(updateTask(updatedTask));
      dispatch(setAlert({message, type: 'success'}));
    }).catch(err => {
      console.log(err)
    });
  }
  console.log(new Date())
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
          <DateTimePicker onChange={(value) => dispatch(setTaskDueDate(value))}
                          locale="sr"
                          value={selectedTask.due_date ? new Date(selectedTask.due_date) : new Date()}/>
        </div>
        <div className="form-group my-2">
          <label htmlFor="notes">Notes</label>
          <textarea className="form-control"
                    value={selectedTask.notes ?? ''}
                    rows={10}
                    name="notes"
                    onChange={(e) => dispatch(setTaskNotes(e.target.value))}/>
        </div>
        <button className="btn btn-success">Update Task</button>
      </form>
  );
}

export default UpdateTaskForm;