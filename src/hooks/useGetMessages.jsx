import axios from 'axios'
import React, { useEffect } from 'react'
import { server } from '../main'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice'

const useGetMessages = () => {
    const {selectedUser}=useSelector((state)=>state.user);
    // const {messages}=useSelector((state)=>state.message);
    const dispatch=useDispatch();
  const fetchMessages=async()=>{
    try{
        const {data}=await axios.get(`${server}/api/v1/messages/get-messages/${selectedUser?._id}`,
            {withCredentials:true}
        )
        dispatch(setMessages(data.messages));
        console.log("Messages are:",data);
    }
    catch(error){
        console.log(error);
    }
  }
  useEffect(()=>{
    fetchMessages();
  },[selectedUser])
}

export default useGetMessages;