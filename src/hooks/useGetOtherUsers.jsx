import React, { useEffect } from 'react'
import axios from "axios"
import { server } from '../main';
import {setOtherUsers} from "../redux/userSlice"
import { useDispatch } from 'react-redux';
const useGetOtherUsers = () => {
    const dispatch=useDispatch();
    const fetchOtherUsers=async()=>{
        try{
            const {data}=await axios.get(`${server}/api/v1/users/get-all-users`,{
                withCredentials:true
            });
            dispatch(setOtherUsers(data.allUsers));
            console.log(data.allUsers);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchOtherUsers();
    },[])
}

export default useGetOtherUsers