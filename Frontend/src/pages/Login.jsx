import { useState } from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate()
  const [data , setData] = useState({
    email : '',
    password : '',
  })

  const loginUser = async (e) =>{
    e.preventDefault();
    const {email , password} = data;
    try {
      const {data} = await axios.post('/login' , {
        email,
        password
      });
      if(data.error){
        toast.error(data.error)
      }
      setData({});
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form className="max-w-sm mx-auto" onSubmit={loginUser}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="techweblabs@.com"
            value={data.email}
            onChange={(e) =>{setData({...data, email : e.target.value})}}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={data.password}
            onChange={(e) =>{setData({...data, password : e.target.value})}}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          login
        </button>
      </form>
    </div>
   
    
  );
}
