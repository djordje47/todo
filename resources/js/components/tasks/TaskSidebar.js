import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setSelectedTask} from "../../features/tasks/taskSlice";

function TaskSidebar(props) {
  const {selectedTask} = useSelector(state => state.task);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setSelectedTask(null))
  }
  return (
      <>
        {selectedTask &&
            <div className="sidebar">
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
                  <form>
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input className="form-control" name="title" value={selectedTask.title}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="subtitle">Subtitle</label>
                      <input className="form-control" name="subtitle" value={selectedTask.subtitle}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="notes">Notes</label>
                      <textarea className="form-control" name="notes">
                        {selectedTask.notes}
                      </textarea>
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