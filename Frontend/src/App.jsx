import React, { useState } from "react";
import Navbar from "./components/Navbar";
import LoginPopup from "./components/LoginPopup";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { UserProvider } from './context/UserContext';
import Home from "./pages/Home";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <UserProvider>
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
      <div className="fixed top-0 -z-10 h-full w-full">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
        <Navbar setShowLogin={setShowLogin}/>
        {showLogin && <LoginPopup setShowLogin={setShowLogin}/>}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/dashboard/*" element={<Dashboard/>}/>
        </Routes>
        </div>
      </div>
    </div>
    </UserProvider> 
  );
};

export default App;
