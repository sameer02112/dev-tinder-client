import {React, useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState(' ');
  const [isLoginVisible, setIsLoginVisible] = useState(true);

  const handleLogin = async () => {
    setErrMessage('');

    const url =  `${BASE_URL}/login`;
    const req = {
      emailId : email,
      password: password
    }
    try{
      const res = await axios.post(url, req, {withCredentials: true});
      dispatch(addUser(res?.data));
      navigate('/');
    }catch(err){
      setErrMessage(err?.response?.data);
    }
  }

  const handleSignUp = async () => {
    setErrMessage('');

    const url =  `${BASE_URL}/signup`;
    const req = {
      firstName: firstName,
      lastName: lastName,
      emailId : email,
      password: password
    }
    try{
      const res = await axios.post(url, req, {withCredentials: true});
      setIsLoginVisible(true);

    }catch(err){
      setErrMessage(err?.response?.data);
    }
  }

  return (
    <div className='flex justify-center my-10'>
      {/* LOGIN PAGE */}
      {isLoginVisible &&
      <div className="card bg-base-300 h-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl justify-center">Login Me</h2>

            <label className="form-control w-full max-w-xs my-5">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input type="text" className="input input-bordered w-full max-w-xs" value={email} onChange={(e) => setEmail(e.target.value)}/>

                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input type="text"  className="input input-bordered w-full max-w-xs" value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
            <div className="flex items-center align-middle flex-col card-actions justify-center mt-5">
             <p>New to Dev Tinder ? <button onClick={() => setIsLoginVisible(!isLoginVisible)}> Register</button></p> 
              <p>{errMessage}</p>
              <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>}
        {/* SIGNUP PAGE */}
        {!isLoginVisible &&  
         <div className="card bg-base-300 h-100 w-96 shadow-xl">
         <div className="card-body">
           <h2 className="card-title text-3xl justify-center">Sign Up</h2>

           <label className="form-control w-full max-w-xs my-5">

           <div className="label">

                 <span className="label-text">First Name</span>
               </div>
               <input type="text" className="input input-bordered w-full max-w-xs" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>

               <div className="label">
                 <span className="label-text">Last Name</span>
               </div>
               <input type="text" className="input input-bordered w-full max-w-xs" value={lastName} onChange={(e) => setLastName(e.target.value)}/>

               <div className="label">
                 <span className="label-text">Email</span>
               </div>
               <input type="text" className="input input-bordered w-full max-w-xs" value={email} onChange={(e) => setEmail(e.target.value)}/>

               <div className="label">
                 <span className="label-text">Password</span>
               </div>
               <input type="text"  className="input input-bordered w-full max-w-xs" value={password} onChange={(e) => setPassword(e.target.value)} />
             </label>
           <div className="flex items-center align-middle flex-col card-actions justify-center mt-5">
            <p>Already a member ? <button onClick={() => setIsLoginVisible(!isLoginVisible)}> Login</button></p> 
             <p>{errMessage}</p>
             <button className="btn btn-primary" onClick={handleSignUp}>Register</button>
           </div>
         </div>
       </div> 
        }
    </div>
   
  )
}

export default Login