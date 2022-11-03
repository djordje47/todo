import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setAuthenticatedUser} from "../../features/user/userSlice";
import {useNavigate} from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cookie = await axios.get('/sanctum/csrf-cookie');
    const user = await axios.post('/api/authenticate', {
      email,
      password
    }).catch(err => {
      console.log(err)
    });
    dispatch(setAuthenticatedUser(user.data));
    if (user) {
      navigate("/list");
    }
  }
  return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            {user.currentUser && <p>Hello & welcome {user.currentUser.name}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className="form-control"
                       name="email"
                       type="email"
                       onChange={e => setEmail(e.target.value)}
                       value={email}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input className="form-control"
                       name="password"
                       type="password"
                       onChange={e => setPassword(e.target.value)}
                       value={password}/>
              </div>
              <button className="btn btn-success my-3">Login!</button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Login;
