import React from "react";
import {deleteTaskStep, setStepCompleted} from "../../features/tasks/taskSlice";
import {setAlert} from "../../features/layouts/alertSlice";
import {useDispatch} from "react-redux";

const SingleStep = ({step}) => {
  const dispatch = useDispatch();
  const handleDelete = (stepId) => {
    axios.delete(`/api/step/${stepId}`).then(({data}) => {
      dispatch(deleteTaskStep(data.deletedStepId));
      dispatch(setAlert({message: data.message}))
    }).catch(err => console.log(err))
  }
  const handleCompleted = (checked, step) => {
    const {name, id} = step;
    axios.put(`/api/step/${id}`, {
      name,
      isCompleted: checked,
    })
    .then(res => {
      dispatch(setStepCompleted(res.data.updatedStep))
    }).catch(err => console.log(err));
  }
  return (
      <li className="list-group-item d-flex justify-content-between align-items-center align-content-center"
          key={step.id}>
        <input type="checkbox" className="form-check-input me-1"
               value={step.is_completed}
               checked={step.is_completed ? 'checked' : ''}
               onChange={e => handleCompleted(e.target.value, step)}/>
        <label className="form-check-label" htmlFor="step-completed">
          {step.name}
        </label>
        <div className="step-actions">
          <i className="bi bi-x-lg text-danger delete-step-btn ms-2"
             onClick={event => handleDelete(step.id)}></i>
        </div>
      </li>
  )
}
export default SingleStep;