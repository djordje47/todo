import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import StepForm from "./StepForm";
import {deleteTaskStep, setStepCompleted, setTaskSteps} from "../../features/tasks/taskSlice";
import {setAlert} from "../../features/layouts/alertSlice";

function Steps() {
  const {selectedTask} = useSelector(state => state.task);
  const {id, steps} = selectedTask;
  const [isCompleted, setIsCompleted] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`/api/step?taskId=${selectedTask.id}`)
    .then(res => {
      dispatch(setTaskSteps(res.data))
    }).catch(err => console.log(err))
  }, []);
  const handleClick = (stepId) => {
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
  const handleUpdate = (stepId) => {

  }
  return (
      <div className="form-group my-2">
        <label htmlFor="steps">Steps</label>
        {steps ?
            <ul className="list-group">
              {steps.map((step, index) =>
                  <li className="list-group-item d-flex justify-content-between align-items-center align-content-center"
                      key={index}>
                    <input type="checkbox" className="form-check-input me-1"
                           value={step.is_completed}
                           checked={step.is_completed ? 'checked' : ''}
                           onChange={e => handleCompleted(e.target.value, step)}/>
                    <label className="form-check-label" htmlFor="step-completed">
                      {step.name}
                    </label>
                    <div className="step-actions">
                      <i className="bi bi-x-lg text-danger delete-step-btn ms-2"
                         onClick={event => handleClick(step.id)}></i>
                      <i className="bi bi-pen text-primary update-step-btn ms-2"
                         onClick={event => handleUpdate(step.id)}></i>
                    </div>
                  </li>
              )}
            </ul>
            : <p>No steps!</p>}
        <StepForm taskId={selectedTask.id}/>
      </div>
  );
}

export default Steps;