import React from 'react';
import Pagination from "react-js-pagination";
import {useDispatch, useSelector} from "react-redux";
import {setTasks} from "../features/tasks/taskSlice";

function AppPagination() {
  const {activeTaskList} = useSelector((state) => state.taskList);
  const {tasks} = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const handlePageClick = (page) => {
    axios.get(`/api/task/${activeTaskList.id}?page=${page}`)
    .then(response => {
      dispatch(setTasks(response.data));
    }).catch(err => console.log(err));
  };
  return (
      <div>
        {tasks.data && <Pagination
            activePage={tasks.currentPage}
            totalItemsCount={tasks.total}
            itemsCountPerPage={tasks.perPage}
            innerClass={'pagination justify-content-center align-items-center m-4'}
            itemClass={'page-item'}
            linkClass={'page-link'}
            onChange={(pageNumber) => handlePageClick(pageNumber)}
        />}
      </div>
  );
}

export default AppPagination;