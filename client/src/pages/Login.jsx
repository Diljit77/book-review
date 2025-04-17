
import React, { useContext, useState } from 'react';

import { FaLock, FaEnvelope } from 'react-icons/fa';
import { MyContext } from '../App';
import { PostData } from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const history=useNavigate();
const context=useContext(MyContext);
    const login=(e)=>{
        e.preventDefault();
        if(email===""){
          context.setalertbox({
            open:true,
            error:true,
            msg:"email is blank"
          })
          return false;
        }
        if(password===""){
          context.setalertbox({
            open:true,
            error:true,
            msg:"password is blank"
          })
          return false;
        }
        try {
          PostData("/api/auth/login",{email,password}).then((res)=>{
            if(res.success===true){
              context.setalertbox({
            open:true,
            error:false,
            msg:res.message
          })  
          const user=JSON.stringify(res.user)
          localStorage.setItem("user",user);
          localStorage.setItem("token",res.token);
          history("/");

        } else{
          context.setalertbox({
            open:true,
            error:true,
            msg:res.message
          })
        }
          }).catch(err=>console.log(err))
        } catch (error) {
          console.log(error)
          context.setalertbox({
            open:true,
            error:true,
            msg:"something went wrong"
          })
        }
    
    }
  
  return (

       <div className="flex justify-center ml-auto mr-auto w-100 items-center h-screen">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login to Your Account</h2>
        <form onSubmit={(e)=>login(e)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setemail(e.target.value)}  className="w-full outline-none" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>setpassword(e.target.value)}  className="w-full outline-none" />
            </div>
          </div>
          <button type="submit" className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg">
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account? <a href="/signup" className="text-blue-600 font-medium">Sign up</a>
        </p>
      </div>
    </div>
   
  )
}

export default Login
