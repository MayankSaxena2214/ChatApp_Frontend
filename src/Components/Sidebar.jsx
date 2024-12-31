import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import OtherUsers from "./OtherUsers";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../main";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setOtherUsers } from "../redux/userSlice";
const Sidebar = () => {
  const navigate = useNavigate();
  const {otherUsers}=useSelector((state)=>state.user);
  const [search, setSearch] = useState("");
  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        `${server}/api/v1/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(setAuthUser(null));
      dispatch(setOtherUsers(null))
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  const dispatch=useDispatch();
  const searchSubmitHandler=(e)=>{
    e.preventDefault();
    if(search.length==0){
      return;
    }
    if(otherUsers && otherUsers.length>0){
      let filteredUsers=otherUsers.filter((user)=>user.fullName.toLowerCase().includes(search.toLowerCase()));
      dispatch(setOtherUsers(filteredUsers));
    }
  }
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form onSubmit={searchSubmitHandler} className="flex gap-2" action="">
        <input
          type="text"
          className="input input-bordered rounded-md"
          placeholder="Search ..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <button className="btn btn-circle bg-slate-500 text-white">
          <FaSearch size={"24px"} />
        </button>
      </form>
      <div className="divider p-3"></div>
      {/* All user to be displayed here */}
      <OtherUsers />

      {/* Logout button for the user */}
      <div>
        <button
          onClick={handleLogout}
          className="btn btn-sm mt-2 bg-red-600 border-red-800 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
