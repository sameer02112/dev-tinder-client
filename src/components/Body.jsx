import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../constants'
import axios from 'axios'
import { addUser } from '../utils/userSlice'
import { addProfilePicture } from '../utils/profilePictureSlice'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.user);

  const fetchUser = async () => {
    try{
      const res = await axios.get(BASE_URL + '/profile/view', { withCredentials: true });
      console.log('res.data',res.data)
      dispatch(addUser(res.data));
    }catch(err){
      console.log(err)
         navigate('/login');
    }
  }

  const fetchProfilePicture = async () => {
    try{
      const res = await axios.get(BASE_URL + '/profile/image', {
        responseType: 'blob',
        withCredentials: true, 
    });
    console.log(res.data.size)
    if(res.data.size != 0){
      const url = URL.createObjectURL(res.data);
      dispatch(addProfilePicture(url));
    }
   
    
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(()=>{
    console.log('userData',userData)
    if(!userData || userData != null){
      fetchUser();
    }
  },[]);

  useEffect(() => {
    fetchProfilePicture();
  },[userData])

  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body