import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import toast, {Toaster} from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux'
import { io } from "socket.io-client"
import { server } from './main'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/userSlice'
const App = () => {
  // This is replaced via socketSlice
  // const [socket,setSocket]=useState(null);
  const dispatch=useDispatch();
  const {socket}=useSelector((state)=>state.socket);
  //socket io checks only when the user is logged in
  const {authUser}=useSelector((state)=>state.user);
  useEffect(()=>{
    console.log("Auth use in app.jsx is:",authUser)
    if(authUser){
      //backend url where it is listneing
      console.log("Inside the existed suthuser")
      const socket=io(`${server}`,{
        query:{
          userId:authUser._id
        }
      });

      dispatch(setSocket(socket));
      //get the online users status
      socket?.on('getOnlineUsers',(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      })
      //not mandatory below code and else code.
      //when the useeffect returns it is called cleanup function
      return ()=> socket.close();
    } 
    else{
      if(socket){
        //clean the storage
        socket.close(); // disconnect function will run automatically
        dispatch(setSocket(null));
      }
    }
  },[authUser])
  return (
    <div className=' h-screen flex items-center justify-center'>
      <BrowserRouter>
        <Toaster/>
        <Routes>
          <Route element={<Home/>} path='/' />
          <Route element={<Login/>} path='/login'/>
          <Route element={<Signup/>} path='/register'/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App