import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../constants';
import { addUser, removeUser } from '../utils/userSlice';
import _ from 'lodash';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';
import { FileUploader } from "react-drag-drop-files";
import { addProfilePicture, removeProfilePicture } from '../utils/profilePictureSlice';

const Profile = () => {

  const user = useSelector(store => store.user);
  const profilePhoto = useSelector(store => store.profilePicture);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {firstName, lastName, age, gender, about, skills, photoUrl} = user || {};

  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [showAccountDeleteModal, setShowAccountDeleteModal] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: null
  })

  const [newProfileObj, setNewProfileObj] = useState({
    'firstName': '',
    'lastName': '',
    'age': '',
    'gender': '',
    'about': '',
    'skills' : [],
    'photoUrl' : ''
  })

  useEffect(() => {
    setNewProfileObj({
      'firstName': firstName,
      'lastName': lastName,
      'age': age,
      'gender': gender,
      'about': about,
      'skills' : skills,
      'photoUrl' : photoUrl
    })
  }, [user]);

  const handleDataChange = (e,type) => {
    setNewProfileObj({...newProfileObj, [type] : [type] == 'skills' ? [e.target.value] : e.target.value});
  }

  const handleProfileSave = async () => {
    setAlert({...alert, show: true});

    try{
      const user = await axios.put(BASE_URL + '/profile/edit', newProfileObj, { withCredentials: true });
      dispatch(addUser(user?.data?.data));
      setAlert({
        show: true,
        message: 'Profile updated successfully',
        type: 'success'
      });
    }catch(err){
      setAlert({
        show: true,
        message: err?.response?.data,
        type: 'error'
      })
    }finally{
      setIsEditModeOn(false);
      setTimeout(() => {
        setAlert({...alert, show: false});
      }, 2000)
    }
  }

  const handleProfileCancel = () => {
    setNewProfileObj({
      'firstName': user?.firstName,
      'lastName': user?.lastName,
      'age': user?.age,
      'gender': user?.gender,
      'about': user?.about,
      'skills' : user?.skills,
      'photoUrl' : user?.photoUrl
    });
    setIsEditModeOn(false);
  }

  const handleAccountDelete = async () => {
    const id = user?._id;
    try{
      axios.delete(BASE_URL+'/delete',  { params: { id: id}}, {withCredentials: true});
      dispatch(removeUser());
      navigate('/login');
    }catch(err){
      console.log('Account Deleted');
    }
  }

  return (
    <>
    <div className='flex justify-center'>
      <h2 className="card-title text-2xl justify-center mt-5  flex-1">My Profile</h2>
      <button className='btn btn-info btn-sm  mt-6 mx-4' onClick={() => setIsEditModeOn(!isEditModeOn)}>Edit</button>
      <button className='btn btn-outline btn-sm btn-error  mt-6 mr-10' onClick={() => handleAccountDelete()}>Delete Account</button>
    </div>
    <div className='flex justify-center my-5'>
        <div className="flex flex-row card bg-base-300 w-full shadow-xl mx-10 p-4">
            {/* left container */}
            <div className='flex-[2]'>
            <div className='flex p-2'>
                {/* field 1 */}
                <div className="label m-2">
                  <span className="label-text">First Name</span>
                </div>
                <input disabled={!isEditModeOn} type="text" className="input input-bordered w-1/2 max-w-xs" value={newProfileObj.firstName} onChange={(e) => handleDataChange(e,'firstName')}/>

                 {/* field 2 */}
                <div className="label m-2">
                  <span className="label-text">Last Name</span>
                </div>
                <input disabled={!isEditModeOn} type="text" className="input input-bordered w-1/2 max-w-xs" value={newProfileObj.lastName} onChange={(e) => handleDataChange(e,'lastName')}/>
            </div>
            
            <div className='flex p-2'>
              {/* field 3 */}
              <div className="label m-2">
                <span className="label-text min-w-16">About</span>
                </div>
                <input disabled={!isEditModeOn} type="text" className="input input-lg input-bordered w-3/4" value={newProfileObj.about}  onChange={(e) => handleDataChange(e,'about')}/>
            </div>

            <div className='flex p-2'>
              {/* field 4 */}
              <div className="label m-2">
                <span className="label-text min-w-16">Skills</span>
                </div>
                <input disabled={!isEditModeOn} type="text" className="input input-bordered w-1/2 max-w-xs" value={newProfileObj.skills?.toString()} onChange={(e) => handleDataChange(e,'skills')}/>
            </div>

            <div className='flex p-2'>
              {/* field 5 */}
              <div className="label m-2">
                <span className="label-text min-w-16">Age</span>
                </div>
                <input disabled={!isEditModeOn} type="text" className="input input-bordered w-1/2 max-w-xs" value={newProfileObj.age} onChange={(e) => handleDataChange(e,'age')}/>
            </div>

            <div className='flex p-2'>
              {/* field 5 */}
              <div className="label m-2">
                <span className="label-text min-w-16">Gender</span>
                </div>
                <input disabled={!isEditModeOn} type="text" className="input input-bordered w-1/2 max-w-xs" value={newProfileObj.gender} onChange={(e) => handleDataChange(e,'gender')}/>
            </div>

            <div className='flex p-2'>
              {/* field 6 */}
              <div className="label m-2">
                <span className="label-text min-w-16">Photo URL</span>
                </div>
                <input disabled={!isEditModeOn} type="text" className="input input-bordered w-1/2 max-w-xs" value={newProfileObj.photoUrl} onChange={(e) => handleDataChange(e,'photoUrl')}/>
            </div>

            </div>
            {/* right container */}
            <div className=' flex flex-col p-2 justify-around items-center bg-neutral rounded-xl'>
              <img className='h-[250px] w-[250px]' src={profilePhoto ? profilePhoto : newProfileObj.photoUrl} alt='user-img'/>
              <DragDrop user = {user}/>
             </div>
        </div>
    </div>

        <div className="flex align-middle justify-center mt-5">
          <button className="btn btn-sm btn-primary m-2" disabled={!isEditModeOn} onClick={handleProfileSave}>Save</button>
          <button className="btn btn-sm  m-2" onClick={handleProfileCancel}>Cancel</button>
        </div>

        {alert.show && <Alert alert={alert}/>}
    </>
  );
}

const DragDrop = ({user}) => {
  const fileTypes = ["JPG", "PNG", "JPEG"];
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const fetchProfilePicture = async () => {
    try{
      const res = await axios.get(BASE_URL + '/profile/image', {
        responseType: 'blob',
        withCredentials: true, 
    });
    const url = URL.createObjectURL(res.data);
    dispatch(addProfilePicture(url));
    
    }catch(err){
      console.log(err.message);
    }
  }

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      await axios.post(BASE_URL + "/profile/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      fetchProfilePicture();
    } catch (err) {
      console.log('Error ' , err.message)
    }
  }

  const handleFileRemove = async () => {
    const id = user?._id;
    try {
      await axios.delete(BASE_URL + "/profile/image", {params : {id : id}}, {withCredentials: true});
      dispatch(removeProfilePicture());
    } catch (err) {
      console.log('Error ' , err.message)
    }
  }

  return (
    <>
     <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
     <div className='btn-container flex'> 
      <button className="btn btn-primary mr-2 btn-sm" onClick={() => handleFileUpload()}>Upload</button>
      <button className="btn btn-secondary  btn-sm" onClick={() => handleFileRemove()}>Remove Photo</button>
     </div>
  
    </>
  )
}

export default Profile