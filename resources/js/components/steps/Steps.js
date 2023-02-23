import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import StepForm from "./StepForm";
import {setTaskSteps} from "../../features/tasks/taskSlice";
import SingleStep from "./SingleStep";

function Steps() {
  const {selectedTask} = useSelector(state => state.task);
  const {id, steps} = selectedTask;
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`/api/step?taskId=${selectedTask.id}`)
    .then(res => {
      dispatch(setTaskSteps(res.data))
    }).catch(err => console.log(err))
  }, []);
  return (
      <div className="form-group my-2">
        <label htmlFor="steps">Steps</label>
        {steps ?
            <ul className="list-group">
              {steps.map((step, index) =>
                  <SingleStep step={step} key={index}/>
              )}
            </ul>
            : <p>No steps!</p>}
        <StepForm taskId={selectedTask.id}/>
      </div>
  );
}

export default Steps;