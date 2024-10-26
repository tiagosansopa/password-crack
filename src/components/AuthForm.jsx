import React, { useState } from "react";
import { Tabs, Tab, Box, TextField, Button } from "@mui/material";

const AuthForm = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState(0); // 0 for login, 1 for register
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setMessage("");
  };

  const handleLoginAPI = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Login successful!");
        localStorage.setItem("token", data.access);
        onLogin(data.access);
      } else {
        setMessage("Login failed");
      }
    } catch (error) {
      console.log(error);
      setMessage("An error occurred");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullName, username, email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage("Registration successful!");
        localStorage.setItem("token", data.access);
        onLogin(data.access);
      } else {
        setMessage(data.error || "Registration failed");
      }
    } catch (error) {
      setMessage("An error occurred");
      console.log(error);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 400, margin: "auto", mt: 4 }}>
      <Tabs value={activeTab} onChange={handleTabChange} centered>
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>

      {activeTab === 0 && (
        <form onSubmit={handleLoginAPI}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
            Login
          </Button>
          <p>{message}</p>
        </form>
      )}

      {activeTab === 1 && (
        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
            Register
          </Button>
          <p>{message}</p>
        </form>
      )}
    </Box>
  );
};

export default AuthForm;
