import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {setAlert} from "../../features/layouts/alertSlice";

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/register', {
      name,
      email,
      password,
      password_confirmation: confirmedPassword
    }).then(res => {
      console.log(res.data);
      dispatch(setAlert(res.data));
    }).catch(err => {
      console.log(err);
    })
  }
  return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            <form onSubmit={e => handleSubmit(e)}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" className="form-control" onChange={(e) => {
                  setEmail(e.target.value)
                }}/>
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" className="form-control" onChange={(e) => {
                  setName(e.target.value)
                }}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" className="form-control" onChange={(e) => {
                  setPassword(e.target.value)
                }}/>
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm password</label>
                <input type="password" name="confirm-password" className="form-control" onChange={(e) => {
                  setConfirmedPassword(e.target.value)
                }}/>
              </div>
              <button className="btn btn-success btn-block my-3">Register!</button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Register;