import React from 'react';
import {useDispatch} from "react-redux";
import {removeAlert} from "../features/layouts/alertSlice";

function Alert({alerts}) {
  console.log('alertcomponent', alerts)
  const dispatch = useDispatch();
  return (
      <>
        {alerts.map((singleAlert, index) => (
            <div key={index}
                 className={`alert alert-${singleAlert.type ?? 'info'} alert-dismissible fade show m-1`}
                 role="alert">
              <p className="mb-0">{singleAlert.message ?? singleAlert}</p>
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                      onClick={(e) => dispatch(removeAlert())}></button>
            </div>
        ))}
      </>
  );
}

export default Alert;