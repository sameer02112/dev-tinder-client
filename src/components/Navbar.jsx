import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { addRequest, removeRequestById } from '../utils/requestsSlice';
import { removeProfilePicture } from '../utils/profilePictureSlice';

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(store => store.user);
  const profilePicture = useSelector(store => store.profilePicture);

  console.log('user',user);
  console.log('profilePicture',profilePicture);

  const [searchText, setSearchText] = useState("");

  const handleLogout = async () => {
    try{
      await axios.post(BASE_URL + '/logout', {}, {withCredentials: true});
      dispatch(removeUser());
      dispatch(removeProfilePicture());
      navigate('/login');
    }catch(err){
      console.log(err)
    }
  }

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  }

  const handleSearch = () => {
    // WRITE SEARCH API WITH DEBOUNCING
  }

  return (
    <div className="navbar bg-base-200 h-24">
      <div className="flex-1 min-w-[150px]">
        <Link to='/' className="btn btn-ghost text-xl">Dev Tinder</Link>
      </div>
      {user && 
      <div className="gap-2">

       <div className="form-control flex flex-row items-center">
          <input type="text" placeholder="Find People.." className="input input-bordered w-[400px]" onChange={(e) => handleSearchText(e)}/>
          <SearchIcon className='ml-2 cursor-pointer' fontSize='large' onClick={() => handleSearch()} />
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
                <img id= 'profile-picture' alt="user photo" src={profilePicture ? profilePicture : user?.photoUrl} />
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

  const dispatch = useDispatch();
  const requests = useSelector(store => store.request);

  useEffect(() => {
    getRequests();
  },[])

  const getRequests = async () => {
    try{
      const res = await axios.get(BASE_URL + '/user/request/recieved', {
        withCredentials: true
      })
      dispatch(addRequest(res?.data));

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

        {requests?.length > 0 &&
         <ul
          tabIndex={0}
          className="flex flex-row menu dropdown-content bg-base-100 rounded-box z-[1] mt-2 w-[530px] max-h-[450px] p-1 overflow-auto shadow">
          {requests?.map(request => <li key={request?._id}><RequestCard request = {request}/></li>)}
        </ul> } 
      </div>
  )
}

const RequestCard = ({request}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requests = useSelector(store => store.request);

  const {createdAt, fromUserId, _id} = request;
  const {firstName, lastName, age, about, photoUrl } = fromUserId;
  const formattedDate = new Date(createdAt).toLocaleString();


  const handleRequest = (status) =>  async () => {
    try{
      const res = await axios.post(BASE_URL + `/request/review/${status}/${_id}` , {} , {
        withCredentials: true
      });

    }catch(err){

    }finally{
      // remove card from list
      dispatch(removeRequestById(_id))
    }
  }

  const handleProfileClick = (id) => async () => {
    navigate('/explore/profile/' + fromUserId?._id);
  }

  return(
    <div className='flex w-[520px] rounded-lg bg-neutral cursor-pointer p-0 m-[1px]'>
      <div role="button" className="btn btn-ghost btn-circle avatar ml-2">
          <div className="w-28 rounded-full">
              <img className='' alt="user photo" src={photoUrl} />
          </div>
      </div>
      <div className='info m-2 flex-grow'>
          <p className='font-bold'>{firstName + " " + lastName}</p>
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