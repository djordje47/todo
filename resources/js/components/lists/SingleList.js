import React from 'react';

function SingleList({taskLists, currentUser}) {
  return (
      <div className="col-3 border-1">
        <h4>{currentUser && `${currentUser.name}'s list`}</h4>
        <hr/>
        <ul className="list-group">
          {taskLists.data ? taskLists.data.map((singleList, index) => (
              <li className="list-group-item" key={singleList.id}>
                {singleList.name}
              </li>
          )) : <p>You don't have any lists yet!</p>}
        </ul>
      </div>
  );
}

export default SingleList;