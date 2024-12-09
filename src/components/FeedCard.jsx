import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../constants';

const FeedCard = ({userData}) => {
    const {firstName, lastName, gender, age, about, skills, email, photoUrl, _id} = userData;


    const handleFeedAction = async (status) => {
      try{
        const res = await axios.post(BASE_URL + `/request/send/${status}/${_id}`, {}, {
          withCredentials: true
        });
        console.log(res);
      }catch(err){

      }
    }

  return (
    <div className='m-2'>
      <div className="card bg-base-300 w-96  h-[550px] shadow-xl">
        <figure className="px-10 pt-10">
          <img src={photoUrl} alt="user-photo" className="rounded-xl h-80 aspect-auto" />
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