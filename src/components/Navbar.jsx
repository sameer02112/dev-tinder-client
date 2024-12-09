import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleLogout = async () => {
    try{
      await axios.post(BASE_URL + '/logout', {}, {withCredentials: true});
      dispatch(removeUser());
      navigate('/login');
    }catch(err){
    }
  }

  return (
    <div className="navbar bg-base-200 h-24">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost text-xl">Dev Tinder</Link>
      </div>
      {user && 
      <div className="gap-2">

       <div className="form-control">
          <input type="text" placeholder="Find People.." className="input input-bordered w-[400px]" />
        </div>

        <RequestButton />
        <NotificationButton/>

        <div className="flex float-end justify-center dropdown align-middle dropdown-end mx-5">
        <p className='mt-3 mr-2'>Hi, {user?.firstName}</p>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
                <img alt="user photo" src={user?.photoUrl} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to='/profile' className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link to='/connections' className="justify-between">
                Connection
              </Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>}
    </div>
  );
}

const RequestButton = () => {

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequests();
  },[])

  const getRequests = async () => {
    try{
      const res = await axios.get(BASE_URL + '/user/request/recieved', {
        withCredentials: true
      })
      setRequests(res?.data);
    }catch(err){

    }
  }

  return (
    <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn hover:bg-base-200 btn-ghost rounded-btn">
          <div className="indicator">
             <span className="indicator-item badge badge-secondary">{requests?.length}</span>
          <button className="btn">Connection Request <PersonAddIcon/></button>
      </div>
        </div>
        <ul
          tabIndex={0}
          className="flex flex-row menu dropdown-content bg-base-100 rounded-box z-[1] mt-2 w-[530px] max-h-[450px] p-1 overflow-auto shadow">
          {requests?.map(request => <li><RequestCard request = {request}/></li>)}
        </ul>  
      </div>
  )
}

const RequestCard = ({request}) => {

  const navigate = useNavigate();

  const {createdAt, fromUserId, _id} = request;
  const {firstName, lastName, age, about, photoUrl } = fromUserId;
  const formattedDate = new Date(createdAt).toLocaleString();


  const handleRequest = (status) =>  async () => {
    try{
      const res = await axios.post(BASE_URL + `/request/review/${status}/${_id}` , {} , {
        withCredentials: true
      });

    }catch(err){

    }
  }

  const handleProfileClick = (id) => async () => {

    console.log('here',fromUserId)
    navigate('/explore/profile/' + fromUserId?._id);
  }

  return(
    <div className='flex w-[520px] rounded-lg bg-neutral cursor-pointer p-0 m-[1px]'>
      <div role="button" className="btn btn-ghost btn-circle avatar pl-2">
          <div className="w-28 rounded-full">
              <img className='' alt="user photo" src={photoUrl} />
          </div>
      </div>
      <div className='info m-2 flex-grow'>
          <p>{firstName + " " + lastName}</p>
          <p className='text-[12px]'>{about}</p>
          <p className='text-[12px]'>sent on: {formattedDate}</p>
      </div>
      <div className="card-actions bottom-10 mr-2">
        <button className="btn btn-accent btn-sm" onClick={handleProfileClick(_id)}>Profile</button>
        <button className="btn btn-primary btn-sm" onClick={handleRequest("accepted")}>Accept</button>
        <button className="btn btn-secondary btn-sm" onClick={handleRequest("rejected")}>Reject</button>
      </div>
    </div>
  )
}

const NotificationButton = () => {
  return (
    <div>
       <div className="indicator">
            <span className="indicator-item badge badge-primary">4</span>
            <button className="btn">Notification <NotificationsActiveIcon/></button>
      </div>
    </div>
  )
}



export default Navbar