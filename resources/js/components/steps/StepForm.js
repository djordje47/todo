import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {addTaskStep} from "../../features/tasks/taskSlice";

function StepForm({taskId}) {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/step', {
      taskId,
      name
    }).then(({data}) => {
      dispatch(addTaskStep(data));
      setName('');
      // Add new step to steps array
    }).catch(err => console.log(err));
  }
  return (
      <form onSubmit={handleSubmit}>
        <div className="input-group my-3">
          <input type="text" value={name}
                 onChange={e => setName(e.target.value)}
                 className="form-control"
                 name="steps"
                 placeholder="New step.."/>
          <button className="btn btn-outline-success btn-sm">Create</button>
        </div>
      </form>
  );
}

export default StepForm;