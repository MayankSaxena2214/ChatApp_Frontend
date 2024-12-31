import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = () => {
    useGetOtherUsers();
    const {otherUsers}=useSelector((state)=>state.user);
    console.log(otherUsers);
    if(!otherUsers){
        return;
    }
  return (
    <div className="overflow-y-auto flex-1">
        {
           otherUsers &&  otherUsers.map((user)=>{
            return <OtherUser key={user._id} user={user} />
           })
        }
    </div>
  );
};

export default OtherUsers;
