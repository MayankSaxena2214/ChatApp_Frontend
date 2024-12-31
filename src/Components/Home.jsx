import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const {authUser}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  console.log(authUser)
  if(authUser==null){
    navigate('/login')
  }
  return (
    <div className='sm:h-[450px] md:h-[500px] flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home