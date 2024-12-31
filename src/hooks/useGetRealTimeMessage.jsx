import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice';

const useGetRealTimeMessage = () => {
    const dispatch=useDispatch();
    const {socket}=useSelector((state)=>state.socket);
    const {messages}=useSelector((state)=>state.message);

    useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            dispatch(setMessages([...messages,newMessage]));
        })
    },[socket,messages,setMessages]);
}

export default useGetRealTimeMessage;