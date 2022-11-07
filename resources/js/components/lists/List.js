import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setActiveTaskList, setTaskLists} from "../../features/taskList/taskListSlice";
import {setTasks} from "../../features/tasks/taskSlice";
import SingleList from "./SingleList";
import SingleTaskList from "./SingleTaskList";
import AppPagination from "../../layouts/AppPagination";

function List(props) {
  const {currentUser} = useSelector((state) => state.user);
  const {taskLists} = useSelector((state) => state.taskList);
  const {tasks} = useSelector((state) => state.task);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) {
      axios.get(`/api/lists/${currentUser.id}`).then(res => {
        if (res.data.data.length > 0) {
          dispatch(setActiveTaskList(res.data.data[0]));
          dispatch(setTaskLists(res.data));
          axios.get(`/api/list-tasks/${res.data.data[0].id}?page=1`)
          .then(res => {
            dispatch(setTasks(res.data));
          }).catch(err => console.log(err))
        }
      }).catch(err => console.log(err));
    }
  }, []);
  return (
      <div className="container">
        <div className="row m-4">
          <SingleList taskLists={taskLists} currentUser={currentUser}/>
          <SingleTaskList tasks={tasks} currentUser={currentUser}/>
        </div>
      </div>
  );
}

export default List;