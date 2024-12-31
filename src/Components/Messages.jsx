import React, { useEffect, useRef } from 'react'
import SingleMessage from './SingleMessage'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux'
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage'

const Messages = () => {
    const {messages}=useSelector((state)=>state.message);
    const scroll=useRef();
    useGetMessages();
    useGetRealTimeMessage();
    console.log("Messages is:",messages);
    
  return (
    <div ref={scroll} className='px-4 flex-1 flex flex-col overflow-auto'>
        {
            messages && messages.length>0 &&  messages.map((message)=>{
                return <SingleMessage key={message._id} message={message}/>
            })
        }
    </div>
  )
}

export default Messages