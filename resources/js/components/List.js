import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Alert from "../layouts/Alert";
import {setActiveTaskList, setTaskLists} from "../features/taskList/taskListSlice";
import {setTasks} from "../features/tasks/taskSlice";

function List(props) {
  const {currentUser} = useSelector((state) => state.user);
  const {alerts} = useSelector((state) => state.alert);
  const {taskLists, activeTaskList} = useSelector((state) => state.taskList);
  const {tasks} = useSelector((state) => state.task);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) {
      axios.get(`/api/lists/${currentUser.id}`).then(res => {
        if (res.data.data.length > 0) {
          dispatch(setActiveTaskList(res.data.data[0]));
          dispatch(setTaskLists(res.data));
          axios.get(`/api/list-tasks/${res.data.data[0].id}`)
          .then(res => {
            console.log(res.data)
            dispatch(setTasks(res.data));
          }).catch(err => console.log(err))
        }
      }).catch(err => console.log(err));
    }
  }, []);
  return (
      <div className="container">
        <div className="row m-4">
          {alerts && <Alert/>}
        </div>
        <div className="row m-4">
          <div className="col-3 border-1">
            <h4>{currentUser && `${currentUser.name}'s list`}</h4>
            <ul className="list-group">
              {taskLists.data && taskLists.data.map((singleList, index) => (
                  <li className="list-group-item" key={singleList.id}>{singleList.name}</li>
              ))}
            </ul>
          </div>
          <div className="col-9 border-1">
            <h4>{currentUser && `${currentUser.name}'s tasks`}</h4>
            <hr/>
            <ul className="list-group">
              {tasks.data && tasks.data.map((singleTask, index) => (
                  <li className="list-group-item" key={singleTask.id}>{singleTask.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  );
}

export default List;