import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setActiveTaskList} from "../../features/taskList/taskListSlice";
import {setTasks} from "../../features/tasks/taskSlice";
import {useNavigate} from "react-router-dom";

function SingleList({currentUser}) {
  const {taskLists} = useSelector((state) => state.taskList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleListClick = (listId) => {
    axios.get(`/api/list/${listId}`).then(res => {
      const {activeList, tasks} = res.data;
      console.log({activeList, tasks})
      navigate(`/list/${listId}`);
      dispatch(setActiveTaskList(activeList));
      dispatch(setTasks(tasks));
    }).catch(err => console.log(err));
  }
  return (
      <div className="col-3 border-1">
        <h4>{currentUser && `${currentUser.name}'s lists`}</h4>
        <hr/>
        <ul className="list-group">
          {taskLists.data ? taskLists.data.map((singleList, index) => (
              <li className="list-group-item" key={singleList.id}>
                <button type="button" className="btn btn-link"
                        onClick={() => handleListClick(singleList.id)}>{singleList.name}</button>
              </li>
          )) : <p>You don't have any lists yet!</p>}
        </ul>
      </div>
  );
}

export default SingleList;