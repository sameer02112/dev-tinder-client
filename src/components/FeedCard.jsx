import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../constants';
import { useNavigate } from 'react-router-dom';
import { getPhoto } from '../helper.js/utilityMethods';
import { useDispatch } from 'react-redux';
import { removeUserFromFeedById } from '../utils/feedSlice';

const FeedCard = ({userData}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {firstName, lastName, gender, age, about, skills, email, photoUrl, uploadedPhotoId,  _id} = userData;


    const handleFeedAction = async (status) => {
      try{
        const res = await axios.post(BASE_URL + `/request/send/${status}/${_id}`, {}, {
          withCredentials: true
        });
        dispatch(removeUserFromFeedById(_id));
      }catch(err){

      }
    }

    const handleImgClick = () => {
      navigate('/explore/profile/' + _id);
    }


  return (
    <div className='m-2'>
      <div className="card bg-base-300 w-96  h-[550px] shadow-xl">
        <figure className="px-10 pt-10 cursor-pointer" onClick={() => handleImgClick()}>
          <img src={getPhoto(uploadedPhotoId, photoUrl)} alt="user-photo" className="rounded-xl h-80 w-[300px] object-cover " />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <span className='text-ellipsis'>{about}</span>
          <div className="card-actions absolute bottom-10">
            <button className="btn btn-primary" onClick={() => handleFeedAction('ignored')}>Ignore</button>
            <button className="btn btn-secondary"  onClick={() => handleFeedAction('interested')}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedCard