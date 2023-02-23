import React from 'react';
import AppPagination from "../../layouts/AppPagination";
import {useSelector} from "react-redux";
import NewTaskForm from "../tasks/NewTaskForm";

import SingleTask from "../tasks/SingleTask";

function SingleTaskList({currentUser}) {
  const {activeTaskList} = useSelector((state) => state.taskList);
  const {tasks} = useSelector(state => state.task);
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
                    <SingleTask key={index} singleTask={singleTask}/>
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