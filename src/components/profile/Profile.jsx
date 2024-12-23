import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Avatar,
} from "@mui/material";
import { useParams } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

import PasswordTesterForm from "../PasswordTesterForm";
import useApi from "../../hooks/useApi";

const Profile = () => {
  const { id } = useParams();

  const [profile, setProfileData] = useState({});
  const { fetchWithRefresh, loading } = useApi();

  const fetchProfiles = async () => {
    const url = `${import.meta.env.VITE_API_URL}/profiles/${id}/`;
    const token = localStorage.getItem("token");
    const response = await fetchWithRefresh(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    setProfileData(data);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            p: 2,
            maxWidth: "600px",
            backgroundColor: profile.cracked ? "green" : "default",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "150px" },
              justifyContent: "center",
              alignItems: "center",
              mb: { xs: 2, sm: 0 },
            }}
          >
            <Typography variant="h5" gutterBottom>
              {profile.name}
            </Typography>
            <Avatar
              src={profile.picture || ""}
              alt={profile.name}
              sx={{
                width: 150,
                height: 150,
                borderRadius: "8px",
                bgcolor: "grey.300",
                color: "white",
              }}
            >
              {profile.picture ? null : <PersonIcon />}
            </Avatar>
          </Box>
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              pl: { sm: 3 },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography variant="body1">
              <strong>Cumpleaños:</strong> {profile.birthday}
            </Typography>
            <Typography variant="body1">
              <strong>Rol:</strong> {profile.profession}
            </Typography>
            <Typography variant="body1">
              <strong>Incio a trabajar en:</strong> {profile.yearsAtCompany}
            </Typography>
            <Typography variant="body1">
              <strong>Informacion Adicional:</strong> {profile.description}
            </Typography>

            {profile.cracked && (
              <Typography variant="body1">
                <strong>Password:</strong> {profile.password}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
      <PasswordTesterForm profile={profile} />
    </>
  );
};

export default Profile;
