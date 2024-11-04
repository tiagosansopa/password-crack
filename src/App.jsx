import React, { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";
import AppLayout from "./components/Layout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Instructions from "./components/instructions/Instructions";
import Profiles from "./components/profile/Profiles";
import Profile from "./components/profile/Profile";
import MyStats from "./components/stats/MyStats";
import Home from "./components/home/Home";

function PasswordCrackerApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <AppLayout isLoggedIn={isLoggedIn}>
        {!isLoggedIn ? (
          <AuthForm onLogin={handleLogin} />
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home onLogout={handleLogout} />} />
            <Route path="/instructions" element={<Instructions />} />
            <Route
              path="/my-stats"
              element={<MyStats onLogout={handleLogout} />}
            />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profiles/:id" element={<Profile />} />
          </Routes>
        )}
      </AppLayout>
    </Router>
  );
}

export default PasswordCrackerApp;
