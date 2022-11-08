import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setTaskNotes, setTaskSubtitle, setTaskTitle, toggleSidebar, updateTask} from "../../features/tasks/taskSlice";

function TaskSidebar() {
  const {selectedTask, isSidebarToggled} = useSelector(state => state.task);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(toggleSidebar(false))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask(selectedTask));
    // axios.put('/api/list-tasks/update', {
    //   id: selectedTask.id,
    //   title: selectedTask.title,
    //   subtitle: selectedTask.subtitle,
    //   notes: selectedTask.notes
    // }).then(res => {
    //   console.log(res)
    //   const {updatedTask, tasks} = res.data;
    //   // dispatch(setSelectedTask(res.updatedTask));
    //   // dispatch(setTasks(res.tasks));
    // }).catch(err => {
    //   console.log(err)
    // });
  }
  return (
      <>
        {isSidebarToggled &&
            <div className="sidebar sidebar-visible">
              <div className="row">
                <div className="col-10">
                  <h6>Update {selectedTask.title}</h6>
                </div>
                <div className="col-2">
                  <span onClick={handleClick}>x</span>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <form className="d-grid" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group my-2">
                      <label htmlFor="title">Title</label>
                      <input className="form-control" name="title" value={selectedTask.title ?? ''}
                             onChange={(e) => dispatch(setTaskTitle(e.target.value))}/>
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="subtitle">Subtitle</label>
                      <input className="form-control" name="subtitle" value={selectedTask.subtitle ?? ''}
                             onChange={(e) => dispatch(setTaskSubtitle(e.target.value))}/>
                    </div>
                    <div className="form-group my-2">
                      <label htmlFor="notes">Notes</label>
                      <textarea className="form-control" value={selectedTask.notes ?? ''} rows={10}
                                name="notes"
                                onChange={(e) => dispatch(setTaskNotes(e.target.value))}/>
                    </div>
                    <button className="btn btn-success">Update</button>
                  </form>
                </div>
              </div>
            </div>}
      </>
  );
}

export default TaskSidebar;