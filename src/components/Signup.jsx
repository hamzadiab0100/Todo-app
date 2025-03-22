import React from 'react';
import { signup } from '../assets';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className='bg-[#FFFFFF]'>
      <div className='lg:container text-white lg:mx-auto xs:flex justify-center lg:block  '>
        <div className='flex  xs:justify-center  my-4 items-center lg:justify-between xl:mx-4 '>
        <div className='xs:hidden lg:flex'>
                <div>
                    <img src={signup} alt="signup" className='w-[700px] h-[98vh] mt-3 m-2' />
                </div>
            </div>
           <div className='bg-[#ffffff] xs:w-[310px] md:w-[500px] lg:w-[60%] xs:m-0 lg:ml-5   '>
            <form className='text-black flex  text-start items-center  flex-col w-full' onSubmit={handleSignup}>
                <h1 className='flex justify-start xs:w-[95%] lg:w-[60%] text-[30px] font-medium py-5 md:mt-40 lg:mt-0'>Sign UP</h1>
                <p className='flex justify-start xs:w-[95%] lg:w-[60%] text-[16px]'>If you already have an account register</p>
                <p className='flex justify-start xs:w-[95%] lg:w-[60%] text-[16px] pb-5'>You can <Link className='px-2 hover:underline text-[#0C21C1] md:mb-16' to="/login">Login here !</Link></p>
                <br />
            
                    <label className='flex justify-start  xs:w-[95%] lg:w-[60%]' htmlFor="email">Email</label>
                    <input value={email}
          onChange={(e) => setEmail(e.target.value)}
         
            className='xs:w-[95%] lg:w-[60%] border-b-2  px-2 py-2 placeholder-[#000842] outline-none md:mb-16 ' placeholder='Enter your email address' type="email" name="" id="email" />
                    <br />
                    <label className='flex justify-start  xs:w-[95%] lg:w-[60%]' htmlFor="ps">Password</label>
                    <input  value={password}
          onChange={(e) => setPassword(e.target.value)} className='xs:w-[95%] lg:w-[60%] border-b-2 mb-8 px-2 py-2 placeholder-[#000842] outline-none md:mb-16' placeholder="Enter your Password" type="password" name="" id="ps" />
                    

                <button className='flex items-center text-white font-medium text-[28px] justify-center my-[23px]  bg-[#0C21C1] py-2 rounded-3xl  xs:w-[95%] lg:w-[60%]' type="submit">Register</button>

                
            </form>
           </div>

            
            

        </div>

      </div>
    </div>
  );
}

export default Signup;
