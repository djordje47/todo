import React from 'react';
import AppPagination from "../../layouts/AppPagination";
import {useSelector} from "react-redux";

function SingleTaskList({currentUser}) {
  const {activeTaskList} = useSelector((state) => state.taskList);
  const {tasks} = useSelector(state => state.task);
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
                    <li className="list-group-item" key={singleTask.id}>{singleTask.title}</li>
                )) : <p>You don't have any tasks yet!</p>}
              </ul>
              <AppPagination/>
            </>
            :
            <p>Please select the list first!</p>}
      </div>
  );
}

export default SingleTaskList;