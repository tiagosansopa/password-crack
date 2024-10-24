import React from "react";
import { Typography, Box, Card, CardContent, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import PasswordTesterForm from "../PasswordTesterForm";
import { profilesData } from "../../assets/test";

const Profile = () => {
  const { id } = useParams(); // Get the profile ID from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically
  const profile = profilesData.find((p) => p.id === parseInt(id));

  if (!profile) {
    return <Typography variant="h5">Profile not found</Typography>;
  }

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
        <Card>
          <CardContent>
            <Typography variant="h4">{profile.name}</Typography>
            <img
              src={profile.picture}
              alt={profile.name}
              style={{ width: "150px", borderRadius: "8px" }}
            />
            <Typography variant="body1">
              Date of Birth: {profile.dateOfBirth}
            </Typography>
            <Typography variant="body1">Role: {profile.role}</Typography>
            <Typography variant="body1">
              Years at Company: {profile.yearsAtCompany}
            </Typography>
            <Typography variant="body1">
              Additional Info: {profile.additionalInfo}
            </Typography>
            <Typography variant="body1">
              Password Type: {profile.passwordType}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <PasswordTesterForm />
    </>
  );
};

export default Profile;
