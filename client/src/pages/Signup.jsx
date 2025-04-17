import React, { useContext, useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { MyContext } from '../App';
import { PostData } from '../utils/api';
import { useNavigate } from 'react-router-dom';


function Signup() {
    const [fullname,sefullname]=useState("");
    const context=useContext(MyContext)
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
const history=useNavigate();
    const signup=(e)=>{
        e.preventDefault();
        if(fullname===""){
          context.setalertbox({
            open:true,
            error:true,
            msg:"email is blank"
          })
          return false;
        }
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
        const fields={
          name:fullname,
          email:email,
          password:password,
          isAdmin:false
        }
        try {
          PostData("/api/auth/signup",fields).then((res)=>{
            if(res.success===true){
              context.setalertbox({
            open:true,
            error:false,
            msg:res.message
          })  
          history("/login");

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
        }
    }
  return (
    <div className="flex justify-center items-center h-screen  ml-auto mr-auto w-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create an Account</h2>
        <form onSubmit={(e)=>signup(e)}>
          <div className="mb-4">
            <label  className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input type="text" value={fullname} onChange={(e)=>sefullname(e.target.value)} placeholder="Your name" className="w-full outline-none" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input type="email" placeholder="Your email" value={email} onChange={(e)=>setemail(e.target.value)} className="w-full outline-none" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input type="password" placeholder="Create a password" value={password} onChange={(e)=>setpassword(e.target.value)} className="w-full outline-none" />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg cursor-pointer">
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600 font-medium">Login</a>
        </p>
      </div>
    </div>
  )
}

export default Signup
