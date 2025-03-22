import React, { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";


const Welcom = lazy(() => import("./pages/Welcom"));
const Todolist = lazy(() => import("./components/Todolist"));
const Signup = lazy (() => import ("./components/Signup"));
const Signin = lazy (() => import ("./components/Signin"));


function App() {


    const [user, setUser] = useState(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

   

    return (
        <Router>
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-[#0000009a]">
      <div className="relative w-6 h-6">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
          className="absolute w-6 h-3 bg-[#4EA8DE] before:content-[''] before:absolute before:border-x-6 before:border-b-[6px] before:border-t-0 before:border-transparent before:top-[-6px] before:left-0 before:right-0 before:border-b-[#4EA8DE] after:content-[''] after:absolute after:border-x-6 after:border-t-[6px] after:border-b-0 after:border-transparent after:bottom-[-6px] after:left-0 after:right-0 after:border-t-[#4EA8DE] animate-honeycomb"
            style={{
              animationDelay: `${i * 0.1}s`,
              left: ["-28px", "-14px", "14px", "28px", "14px", "-14px", "0px"][
                i
              ],
              top: ["0", "22px", "22px", "0", "-22px", "-22px", "0"][i],
            }}
          />
        ))}
      </div>
    </div>}>
                <Routes>
                    <Route path="/" element={<Welcom />} />
                    <Route path="/login" element={user ? <Navigate to="/todo" /> : <Signin />} />
                    <Route path="/signup" element={user ? <Navigate to="/todo" /> : <Signup />} />
                    <Route path="/todo" element={user ? <Todolist user={user} /> : <Navigate to="/" />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
