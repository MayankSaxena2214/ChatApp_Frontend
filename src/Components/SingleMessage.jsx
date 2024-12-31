import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

const SingleMessage = ({message}) => {
    const {authUser}=useSelector((state)=>state.user)
    console.log("Auth user is",authUser);
    const scroll=useRef();
    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[message]);
  return (
<div ref={scroll} className={`${authUser?._id==message?.senderId ? ' chat chat-end':'chat chat-start'}` }>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className="chat-header">
   
    <time className="text-xs text-gray-800 opacity-50">12:45</time>
  </div>
  <div className="chat-bubble">{message?.message}</div>
  
</div>
  )
}

export default SingleMessage