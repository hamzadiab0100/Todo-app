import React from 'react';
import { Link } from 'react-router-dom';
import { logo, logo1x, welcom,welcom_s } from '../assets';
import "../styles/Welcom.css";
import { BiLogIn } from "react-icons/bi";
import { FaUserPlus } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { FaBell } from "react-icons/fa";

function Welcom() {
  return (
    <>
    <div id='bg' className=' hidden lg:flex gap-0 pt-2 pb-16 h-[100%] flex-col items-center'>
<div className='w-full flex justify-center items-center py-1'> 
  <Link to="/">
<div className='flex items-center cursor-pointer'>
<img src={logo} alt="logo" /> <h1 className='pl-2 text-2xl font-bold text-[#4EA8DE]'>To</h1><h2 className='text-2xl font-bold text-[#5E60CE]'>do</h2>
</div>
</Link>
</div>
<div className='lg:container px-10 mx-auto flex xs:justify-end lg:justify-between items-center my-10'>
<div>
  <h1 className='text-white text-4xl tracking-wide font-bold pb-2'>Organize Your Day,</h1>
  <h2 className='text-[#000000] pb-7 text-4xl tracking-wide font-bold'>Enhance Your Life</h2>
  <p className='text-[#D1D5DB] pb-7 w-[450px]'>
    Transform your productivity with TaskFlow. Our intuitive platform 
    helps you manage tasks, set priorities, and achieve your goals 
    with ease
  </p>
  <div className='flex justify-start gap-6 py-5'>
 <Link to="/login"> <button  className='flex items-center gap-1 py-2 px-4 rounded-md text-white bg-[#191919]'><BiLogIn />Login</button></Link>  
  <Link to='/signup'><button className='flex items-center gap-1 py-2 px-4 rounded-md text-white bg-[#4EA8DE]'><FaUserPlus />Sign Up</button></Link>  

  </div>
</div>

  <img loading='lazy' src={welcom} alt="welcom" className='hidden lg:flex w-[550px] h-auto pb-10 ' />

</div>
<div className='  w-full flex justify-around flex-wrap px-5'>
  <div className='w-[310px] h-[190px] hover:scale-105 duration-300 cursor-pointer rounded-lg bg-[#262C3E] '>
  <FaTasks className='m-4 text-[30px] text-[#4EA8DE]' />
  <h1 className='px-4 py-2 text-white font-bold tracking-wider break-words w-[100%] text-[22px]'>Smart Task Mangement</h1>
  <p className='px-4 py-2 text-[#D1D5DB] w-[95%] break-words pb-5 text-sm'>Organize tasks with intelligent categorization and priority settings.</p>
  </div>
  <div className='w-[310px] h-[190px] hover:scale-105 duration-300 cursor-pointer rounded-lg bg-[#262C3E] '>
  <GiProgression className='m-4 text-[30px] text-[#4EA8DE]' />
  <h1 className='px-4 py-2 text-white font-bold tracking-wider break-words w-[100%] text-[22px]'>Progress Tracking</h1>
  <p className='px-4 py-2 text-[#D1D5DB] w-[95%] break-words pb-5 text-sm'>Monitor your productivity with detailed analytics and insights.</p>
  </div>
  <div className='w-[310px] h-[190px] hover:scale-105 duration-300 cursor-pointer rounded-lg bg-[#262C3E] flex flex-col '>
  <FaBell className='m-4 text-[30px] text-[#4EA8DE]' />
  <h1 className='px-4 py-2 text-white font-bold tracking-wider break-words w-[100%] text-[22px]'>Smart Reminder</h1>
  <p className='px-4 py-2 text-[#D1D5DB] w-[95%] break-words pb-5 text-sm'>Never miss a deadline with customizable notifications.</p>
  </div>
</div>
    </div>
    <div id='bg-s' className='xs:h-[100%] min-h-[558px] md:pb-52  pb-20  w-full max-h-[1950px] lg:hidden'>
         <div className='flex flex-col justify-center items-center'>
          <img loading='lazy' src={welcom_s} alt="welcom" className='w-auto h-auto md:w-[400px] py-6 md:mt-36' />
         <img src={logo1x} alt="logo1x" className='pb-4' />
         <h1 className='text-[18px] tracking-wider text-white font-semibold break-words w-[90%] text-center md:py-11'>Your Personal Task Management Solution</h1>
         <p className='text-[14px] py-4 text-white  break-words w-[90%] text-center md:py-11'>Streamline your daily workflow, boost productivity, and never miss a deadline with our intuitive task management platform. </p>
          <Link to="/login"><button className='w-[300px] py-3 my-3 rounded-lg bg-[#5E60CE] flex items-center justify-center gap-2 text-white text-xl'> <BiLogIn  /> <h1>Login</h1> </button></Link>
          <Link to="/signup"><button className='w-[300px] py-3 mt-3  rounded-lg bg-[#4EA8DE] flex items-center justify-center gap-2 text-white text-xl'> <FaUserPlus  /><h1>Sign Up</h1> </button></Link>
           
         </div>
    </div>
    </>
  );
}

export default Welcom;