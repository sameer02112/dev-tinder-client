import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../constants'
import axios from 'axios'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.user);

  const fetchUser = async () => {
    try{
      const res = await axios.get(BASE_URL + '/profile/view', { withCredentials: true });
      dispatch(addUser(res.data));
    }catch(err){
      if(err?.status == 401) navigate('/login');
    }
  }

  useEffect(()=>{
    if(!userData){
      fetchUser();
    }
  },[]);

  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body