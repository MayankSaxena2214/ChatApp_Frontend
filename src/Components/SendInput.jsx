import axios from "axios";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { server } from "../main";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setMessages } from "../redux/messageSlice";
const SendInput = () => {
    const {selectedUser}=useSelector((state)=>state.user)
    const dispatch=useDispatch();
  const [inputMessage, setInputMessage] = useState("");
  const {messages}=useSelector((state)=>state.message);

  const handleSendMessage=async(e)=>{
    e.preventDefault();
    if(!selectedUser)return ;
    try{
        const {data}=await axios.post(`${server}/api/v1/messages/send-message/${selectedUser?._id}`,{
            message:inputMessage
        },{
            withCredentials:true
        });
        setInputMessage("")
        dispatch(setMessages([...messages,data.newMessage]))
        toast.success(data.message);
    }
    catch(error){
        console.log(error);
        toast.error(error?.response?.data?.message || "Some error occured in sending messages");
    }
    
  }
  return (
    <form className="px-4 my-3" onSubmit={handleSendMessage}>
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Enter message ..."
          className="border border-zinc-400 p-3 text-sm rounded-lg block w-full bg-gray-600 text-white"
          value={inputMessage}
          onChange={(e)=>setInputMessage(e.target.value)}
        />
        <button className="absolute inset-y-0 end-0 flex items-center pr-4">
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
