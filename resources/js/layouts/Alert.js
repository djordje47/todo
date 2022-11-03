import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {removeAlert} from "../features/layouts/alertSlice";

function Alert() {
  const {alerts} = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const handleClick = (e, index) => {
    e.preventDefault();
    dispatch(removeAlert(index));
  }
  return (
      <div>
        {alerts.map((singleAlert, index) => (
            <div className={`alert alert-${singleAlert.type ?? 'info'} alert-dismissible fade show m-2`} role="alert">
              {singleAlert.title && <h3>{singleAlert.title}</h3>}
              <p>{singleAlert.message}</p>
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                      onClick={(e) => handleClick(e, index)}></button>
            </div>
        ))}
      </div>
  );
}

export default Alert;