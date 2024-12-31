import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const {selectedUser,authUser}=useSelector((state)=>state.user);
  // Cleaing the selected user
  const dispatch=useDispatch();
  // useEffect(()=>{
  //   return ()=>dispatch(setSelectedUser(null));
  // },[])
    const {onlineUsers}=useSelector((state)=>state.user);
    const isOnline=onlineUsers?.includes(selectedUser?._id) || false;
  return (
    <>
      {
        selectedUser!=null? (
          < div className="md:min-w-[450px] flex flex-col">
      <div className=" flex gap-2 hover:bg-zinc-500 items-center bg-zinc-800 text-white px-4 py-2 mb-2">
        {/* Avatar */}
        <div className={`${isOnline ? 'active online':'active'} `}>
          <div className="w-12 rounded-full">
            <img
              src={`${selectedUser?.profile}`}
              alt=""
              className=""
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 flex-1 items-cente justify-center">
            {/* to be set dynamically */}
            <p>{selectedUser?.fullName}</p>
          </div>
        </div>
      </div>
      {/* Show messages of the user */}
      <Messages/>
      {/* sendmessage input */}
      <SendInput/>
    </div>
        ):
        (
          < div className="md:min-w-[450px] flex flex-col justify-center items-center">
            <h1 className="font-bold text-white text-xl">Hi {authUser?.fullName} .Let'start the conversation</h1>
          </div>
          
        )
      }
    </>
  );
};

export default MessageContainer;
