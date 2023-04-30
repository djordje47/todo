import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createTaskList, deleteTaskList, setActiveTaskList} from "../../features/taskList/taskListSlice";
import {setTasks} from "../../features/tasks/taskSlice";
import {useNavigate} from "react-router-dom";
import {setAlert} from "../../features/layouts/alertSlice";

function SingleList({currentUser}) {
  const {taskLists} = useSelector((state) => state.taskList);
  const [listName, setListName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleListClick = (listId) => {
    axios.get(`/api/task-list/${listId}`).then(res => {
      const {activeList, tasks} = res.data;
      navigate(`/list/${listId}`);
      dispatch(setActiveTaskList(activeList));
      dispatch(setTasks(tasks));
    }).catch(err => console.log(err));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('api/task-list', {
      listName
    }).then(res => {
      const {taskLists, message} = res.data;
      dispatch(createTaskList(taskLists));
      dispatch(setAlert({message, type: 'success'}))
      setListName('');
    }).catch(err => {
      console.log(err)
    })
  }
  const handleListDelete = (listId) => {
    axios.delete(`/api/task-list/${listId}`).then(res => {
      dispatch(deleteTaskList(listId));
      dispatch(setAlert({message: res.data.message}))
    }).catch(err => {
      const message = err.response.data.message;
      dispatch(setAlert({message, type: 'danger'}))
    })
  }
  return (
      <div className="col-lg-3 col-sm-12 col-xs-12 border-1">
        <h4>{currentUser && `${currentUser.name}'s lists`}</h4>
        <hr/>
        <ul className="list-group">
          {taskLists ? taskLists.map((singleList, index) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={singleList.id}>
                <button type="button" className="btn btn-link"
                        onClick={() => handleListClick(singleList.id)}>{singleList.name}</button>
                <i className="bi bi-x-lg delete-list-btn" onClick={() => handleListDelete(singleList.id)}></i>
              </li>
          )) : <p>You don't have any lists yet!</p>}
        </ul>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input-group my-3">
            <input type="text" name="list_name"
                   autoComplete="off"
                   placeholder="Create new list"
                   className="form-control"
                   value={listName}
                   onChange={(e) => setListName(e.target.value)}/>
            <button className="btn btn-sm btn-success">Create</button>
          </div>
        </form>
      </div>
  );
}

export default SingleList;