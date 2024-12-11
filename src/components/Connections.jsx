import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import CallIcon from '@mui/icons-material/Call';
import SendIcon from '@mui/icons-material/Send';

const Connections = () => {

    const dispatch = useDispatch();

    const [selectedConnection, setSelectedConnection] = useState([]);
    const connections = useSelector(store => store.connection);

    useEffect(() => {
        fetchConnections();
    },[])

    useEffect(() => {
        console.log('use')
        if(connections){
            console.log('connections',connections)
            setSelectedConnection(connections[0]);
        } 
    }, [connections]);

    const fetchConnections = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/connection", {
                withCredentials: true
            })
            dispatch(addConnection(res?.data)); 
            if(res?.data?.length > 0){
                console.log(res?.data)
                setSelectedConnection(res?.data[0]);
            }
        }catch(err){

        }
    }

  if(connections?.length == 0) return <>No connections found</>
  return (
   <div className='flex mt-2 h-3/4 border-2 border-[#009386] ml-4 mr-4 min-h-[650px] rounded-xl'>
    <div className='sidebar w-80'>
        {connections?.map(connection =>  <ConnectionCard connection={connection} key={connection?._id}/>)}
    </div>
    <div className='charBarContainer chatbar flex-1 bg-neutral h-[650px] rounded-xl'>
        <ChatBar connection = {selectedConnection}/>
    </div>
   </div>
  )
}


const ConnectionCard = ({connection}) => {
    const {firstName, lastName, photoUrl, about} = connection;
    return(
        <div className='flex bg-base-300 w-full h-20 border-b-[0.5px] border-[#c9c9c9] pl-2 pt-4 rounded-lg cursor-pointer'>
            <div role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-28 rounded-full">
                    <img className='' alt="user photo" src={photoUrl} />
                </div>
            </div>
            <div className='info m-2'>
                <p>{firstName + " " + lastName}</p>
                <p className='text-sm'>{about}</p>
            </div>
        </div>
    )
}

const ChatBar = ({connection}) => {

    if(!connection) return <></>;

    const {firstName, lastName, photoUrl} = connection;
    return (
        <div className='flex flex-col h-full justify-between rounded-xl'>
            <div className='chatHeader flex h-16 w-full bg-base-100 rounded-t-xl items-center justify-between'>
                <div className='header-title flex items-center  pl-2 '>
                    <div role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-28 rounded-full mr-2">
                            <img className='' alt="user photo" src={photoUrl} />
                        </div>
                    </div>
                    <span>{firstName + " " + lastName}</span>
                </div>
                <div className='header-actions pr-2 w-[100px] flex cursor-pointer justify-between'>
                    <CallIcon fontSize='medium'/>
                    <SearchIcon fontSize='medium'/>
                    <MicIcon fontSize='medium'/>
                </div>
            </div>
            <div className='chatBody flex flex-grow'>
                {/* chat body */}
            </div>
            {/* chat footer */}
            <div className='items-center justify-between w-full chatFooter p-2 flex opacity-75 bg-base-300 rounded-b-xl'>
                <SentimentSatisfiedAltIcon fontSize='large'/>
                <input className=' h-12 w-[90%] bg-neutral rounded-full'></input>
                <SendIcon fontSize='large' style={{color: '#009386', marginRight: '15px', cursor: 'pointer'}}/>
            </div>
        </div>
    )
}

export default Connections