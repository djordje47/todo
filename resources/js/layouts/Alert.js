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
            <div key={index}
                 className={`alert alert-${singleAlert.type ?? 'info'} alert-dismissible fade show m-1`}
                 role="alert">
              <p className="mb-0">{singleAlert.message}</p>
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                      onClick={(e) => handleClick(e, index)}></button>
            </div>
        ))}
      </div>
  );
}

export default Alert;