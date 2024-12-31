import React, { useEffect, useReducer, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {authUser}=useSelector((state)=>state.user);
  console.log(authUser);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    // Basic form validation
    try {
      if (!username || !password) {
        alert("Please fill in all fields");
        return;
      }

      // Here, you can integrate your API call for login

      const { data } = await axios.post(
        `${server}/api/v1/users/login`,
        {
          userName: username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      dispatch(setAuthUser(data.user));

      // Reset form after submission

      setPassword("");
      toast.success(data.message || "Logged in successfully default message");
      setBtnLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setBtnLoading(false);
      toast.error(error?.response?.data?.message || "Some error occured ");
    }
  };

  return (
    <section className="bg-black bg-opacity-40 backdrop-blur-sm p-8 w-full ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your username
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Handle email input change
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Handle password input change
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <NavLink to={"/register"}>Sign up</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
