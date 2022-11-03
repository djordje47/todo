import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import Alert from "../layouts/Alert";

function List(props) {
  const {currentUser} = useSelector((state) => state.user);
  const {alerts} = useSelector((state) => state.alert)
  return (
      <div className="container">
        <div className="row alerts">
          {alerts && <Alert/>}
        </div>
      </div>
  );
}

export default List;