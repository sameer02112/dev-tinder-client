import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

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
   <div className='flex m-16 h-3/4 pt-1 bg-base-200 min-h-[650px] rounded-xl'>
    <div className='sidebar w-80'>
        {connections?.map(connection =>  <ConnectionCard connection={connection} key={connection?._id}/>)}
    </div>
    <div className='charBarContainer chatbar flex-1 bg-neutral h-[650px] m-4 mt-1 rounded-xl'>
        <ChatBar connection = {selectedConnection}/>
    </div>
   </div>
  )
}


const ConnectionCard = ({connection}) => {
    const {firstName, lastName, photoUrl} = connection;
    return(
        <div className='flex bg-base-300 w-full h-20 mt-1 ml-2 rounded-lg cursor-pointer'>
            <div role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-28 rounded-full">
                    <img className='' alt="user photo" src={photoUrl} />
                </div>
            </div>
            <div className='info m-2'>
                <p>{firstName + " " + lastName}</p>
            </div>
        </div>
    )
}

const ChatBar = ({connection}) => {

    if(!connection) return <></>;

    const {firstName, lastName, photoUrl} = connection;
    return (
        <div className='flex flex-col h-full justify-between rounded-xl'>
            <div className='chatHeader flex h-16 w-full bg-base-300 rounded-t-xl items-center justify-between'>
                <div className='header-title flex items-center  pl-2 '>
                    <div role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-28 rounded-full">
                            <img className='' alt="user photo" src={photoUrl} />
                        </div>
                    </div>
                    <span>{firstName + " " + lastName}</span>
                </div>
                <div className='header-actions pr-2'>
                    <button>X</button>
                    <button>Y</button>
                    <button>Z</button>
                </div>
            </div>
            <div className='chatBody flex flex-grow'>
                {/* chat body */}
            </div>
            <div className='items-center chatFooter flex h-16 opacity-75 bg-base-300 rounded-b-xl p-2'>
                <div>X</div>
                <input className='rounded-xl h-12 w-2/3 bg-neutral m-4 p-4 flex-grow'></input>
                <div className=''>SEND</div>
            </div>
        </div>
    )
}

export default Connections