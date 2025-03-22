import React, { useState } from "react";
import { signin } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/todo"); 
    } catch (error) {
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setError("Incorrect email or password"); 
        
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };


  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user); 
        navigate("/todo");
      })
      .catch((error) => {
        console.error("Error during Google sign-in:", error);
        if (error.code === 'auth/popup-closed-by-user') {
          setError("The popup was closed before completing the sign-in process.");
        } else if (error.code === 'auth/cancelled-popup-request') {
          setError("The popup was cancelled. Please try again.");
        } else {
          setError("An error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="bg-[#FFFFFF]">
      <div className="lg:container text-white lg:mx-auto xs:flex justify-center items-center lg:block">
        <div className="flex h-full xs:justify-center my-4 items-center lg:justify-between xl:mx-4">
          <div className="bg-[#ffffff] xs:w-[310px] md:w-[500px] lg:w-[60%] xs:m-0 lg:mr-5">
            <form className="text-black flex text-start items-center flex-col w-full" onSubmit={handleSignIn}>
              <h1 className="flex justify-start xs:w-[95%] lg:w-[60%] text-[30px] font-medium py-5 md:mt-40 lg:mt-0">Sign in</h1>
              <p className="flex justify-start xs:w-[95%] lg:w-[60%] text-[16px]">
                If you don’t have an account register
              </p>
              <p className="flex justify-start xs:w-[95%] lg:w-[60%] text-[16px] pb-5">
                You can{" "}
                <Link className="px-2 hover:underline text-[#0C21C1] md:mb-10" to="/signup">
                  Register here !
                </Link>
              </p>

              

              <label className="flex justify-start xs:w-[95%] lg:w-[60%]" htmlFor="email">
                Email
              </label>
              <input
                className="xs:w-[95%] lg:w-[60%] border-b-2 px-2 py-2 placeholder-[#000842] md:mb-16 outline-none"
                placeholder="Enter your email address"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="flex justify-start xs:w-[95%] lg:w-[60%]" htmlFor="ps">
                Password
              </label>
              <input
                className="xs:w-[95%] lg:w-[60%] border-b-2 mb-8 px-2 py-2 placeholder-[#000842] md:mb-16 outline-none"
                placeholder="Enter your Password"
                type="password"
                id="ps"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="xs:w-[100%] lg:w-[60%] flex justify-between">
                <div className="flex items-center">
                  <input className="mr-1" type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <div>
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>} 
              <button
                className="flex items-center text-white font-medium text-[28px] justify-center my-[23px] mt-[35px] bg-[#0C21C1] py-2 rounded-3xl xs:w-[95%] lg:w-[60%]"
                type="submit"
              >
                Login
              </button>

              <p className="text-[#B5B5B5]">or continue with</p>
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center my-[23px] bg-[#0C21C1] py-4 rounded-3xl xs:w-[95%] lg:w-[60%] text-xl text-white"
              >
                <FcGoogle className="text-xl mr-2" /> Login with Google
              </button>
            </form>
          </div>

          <div className="xs:hidden lg:flex">
            <img src={signin} alt="signin" className="w-[700px] h-[98vh] mt-3 m-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
