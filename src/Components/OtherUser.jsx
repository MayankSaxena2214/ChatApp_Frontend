import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({user}) => {
    const {selectedUser}=useSelector((state)=>state.user);
    const {onlineUsers}=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const selectedUserHandler=(user)=>{
        dispatch(setSelectedUser(user))
    }
    const isOnline=onlineUsers?.includes(user._id) || false;
  return (
    <div>
      <div onClick={()=>selectedUserHandler(user)} className={`${selectedUser?._id == user?._id ? 'bg-gray-400':''}  flex gap-2 hover:bg-zinc-200 p-2 rounded-xl items-center`}>
        {/* Avatar */}
        <div className={`avatar ${isOnline ? 'online':''}`}>
          <div className="w-12 rounded-full">
            <img
              src={user.profile}
              alt=""
              className=""
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 flex-1 items-cente justify-center">
            <p className='text-black'>{user.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0"></div> 
    </div>
  )
}

export default OtherUser