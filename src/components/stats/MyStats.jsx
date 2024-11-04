import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

import useApi from "../../hooks/useApi";

const MyStats = ({ onLogout }) => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);

  const { fetchWithRefresh, loading } = useApi();

  const fetchProfile = async () => {
    const url = `${import.meta.env.VITE_API_URL}/profile/`;
    const token = localStorage.getItem("token");
    const response = await fetchWithRefresh(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      setError("Failed to load profile. Please try again.");
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    setProfile(data);
    console.log("EXCITED", data);
  };

  useEffect(() => {
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
            Perfil
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Nombre:
            </Typography>
            <Typography variant="body1">{`${profile.first_name} ${profile.last_name}`}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Usuario:
            </Typography>
            <Typography variant="body1">{profile.username}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Email:
            </Typography>
            <Typography variant="body1">{profile.email}</Typography>
          </Box>
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
