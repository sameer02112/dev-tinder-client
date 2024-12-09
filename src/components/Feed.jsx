import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import FeedCard from './FeedCard';
import Requests from './Requests';

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);

  useEffect(() => {
    getFeed();
  },[]);

  const getFeed = async () => {
    // if(feed) return;
    try {
      let feed = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(feed?.data));
    } catch (err) {
    }
  }

  return (
    <div className='flex'>
      <div className="">
        {/* <Requests/> */}
      </div>
      <div className="flex overflow-x-auto">
        {feed?.map((user, index) => (
          <FeedCard userData={user} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Feed