import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

const MyStats = ({ onLogout }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/profile/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("el profile", data);
        setProfile(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to load profile. Please try again.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ maxWidth: 400, mx: "auto", p: 3, borderRadius: "8px" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            My Profile
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Name:</strong>{" "}
            {`${profile.first_name} ${profile.last_name}`}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Username:</strong> {profile.username}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {profile.email}
          </Typography>
        </CardContent>

        <Button
          variant="contained"
          color="primary"
          onClick={onLogout}
          sx={{ mt: 2, width: "100%" }}
        >
          Logout
        </Button>
      </Card>
    </Box>
  );
};

export default MyStats;
