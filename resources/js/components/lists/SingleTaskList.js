import React from 'react';
import AppPagination from "../../layouts/AppPagination";
import {useDispatch, useSelector} from "react-redux";
import NewTaskForm from "../tasks/NewTaskForm";
import {setSelectedTask, toggleTaskSidebar} from "../../features/tasks/taskSlice";

function SingleTaskList({currentUser}) {
  const {activeTaskList} = useSelector((state) => state.taskList);
  const {tasks} = useSelector(state => state.task);
  const dispatch = useDispatch();
  const handleClick = (singleTask) => {
    // dispatch(toggleTaskSidebar())
    dispatch(setSelectedTask(singleTask))
  }
  return (
      <div className="col-9 border-1">
        <div className="row">
          <div className="col-10">
            <h4>{currentUser && `${currentUser.name}'s ${activeTaskList ? activeTaskList.name : 'tasks'}`}</h4>
          </div>
        </div>
        {activeTaskList ?
            <p>{activeTaskList.subtitle}</p> : ''}
        <hr/>
        {activeTaskList ?
            <>
              <ul className="list-group">
                {tasks.data ? tasks.data.map((singleTask, index) => (
                    <li className="list-group-item single-task" key={singleTask.id} onClick={() => handleClick(singleTask)}>
                      {singleTask.title}
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