import React from 'react';

function SingleTaskList({currentUser, tasks}) {
  return (
      <div className="col-9 border-1">
        <h4>{currentUser && `${currentUser.name}'s tasks`}</h4>
        <hr/>
        <ul className="list-group">
          {tasks.data ? tasks.data.map((singleTask, index) => (
              <li className="list-group-item" key={singleTask.id}>{singleTask.title}</li>
          )) : <p>You don't have any tasks yet!</p>}
        </ul>
      </div>
  );
}

export default SingleTaskList;