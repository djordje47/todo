import React from 'react';
import {Pagination} from 'react-laravel-paginex';
import {useDispatch, useSelector} from "react-redux";
import {setTasks} from "../features/tasks/taskSlice";

function AppPagination({items}) {
  const {activeTaskList} = useSelector((state) => state.taskList);
  const dispatch = useDispatch();
  const handlePageClick = (data) => {
    axios.get(`/api/list-tasks/${activeTaskList.id}?page=${data.page}`)
    .then(response => {
      dispatch(setTasks(response.data));
    }).catch(err => console.log(err));
  };
  return (
      <div>
        {items && <Pagination changePage={handlePageClick} data={items}/>}
      </div>
  );
}

export default AppPagination;