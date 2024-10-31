import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Avatar,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import PasswordTesterForm from "../PasswordTesterForm";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfileData] = useState({});
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/profiles/${id}/`
        );
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchProfiles();
  }, []);

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackClick}
          sx={{ mb: 2 }}
        >
          Back
        </Button>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            p: 2,
            maxWidth: "600px",
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
              <strong>Date of Birth:</strong> {profile.birthday}
            </Typography>
            <Typography variant="body1">
              <strong>Role:</strong> {profile.profession}
            </Typography>
            <Typography variant="body1">
              <strong>Years at Company:</strong> {profile.yearsAtCompany}
            </Typography>
            <Typography variant="body1">
              <strong>Additional Info:</strong> {profile.description}
            </Typography>
            <Typography variant="body1">
              <strong>Password Type:</strong> {profile.password_requirements}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <PasswordTesterForm id={profile.id} />
    </>
  );
};

export default Profile;
