import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setTasks} from "../../features/tasks/taskSlice";
import {setAlert} from "../../features/layouts/alertSlice";

function NewTaskForm(props) {
  const {activeTaskList} = useSelector(state => state.taskList)
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/create-task', {
      title,
      subtitle: '',
      notes: '',
      listId: activeTaskList.id
    }).then(res => {
      const {data} = res;
      setTitle('');
      dispatch(setTasks(data));
    }).catch(err => {
      console.log(err)
      if (err.response.hasOwnProperty('data')) {
        err.response.data.forEach(single => {
          dispatch(setAlert({type: 'danger', message: single}))
        });
      }
    })
  }
  return (
      <div className="row">
        <div className="col-12">
          <form onSubmit={event => handleSubmit(event)}>
            <div className="form-group">
              <input className="form-control" placeholder="Create new task.." name="title" value={title}
                     onChange={(e) => setTitle(e.target.value)}/>
            </div>
          </form>
        </div>
      </div>
  );
}

export default NewTaskForm;