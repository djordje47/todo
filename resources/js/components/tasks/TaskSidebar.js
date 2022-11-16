import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toggleSidebar} from "../../features/tasks/taskSlice";
import UpdateTaskForm from "./UpdateTaskForm";
import Steps from "../steps/Steps";

function TaskSidebar() {
  const {selectedTask, isSidebarToggled} = useSelector(state => state.task);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(toggleSidebar(false))
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
                  <i className="bi bi-x-lg delete-list-btn" onClick={handleClick}></i>
                </div>
              </div>
              <div className="row">
                <Steps/>
              </div>
              <div className="row">
                <div className="col-12">
                  <UpdateTaskForm/>
                </div>
              </div>
            </div>}
      </>
  );
}

export default TaskSidebar;