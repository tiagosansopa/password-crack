import { React, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  Avatar,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const Profiles = () => {
  const [profilesData, setProfilesData] = useState([]);
  const navigate = useNavigate();

  const handleProfileClick = (id) => {
    navigate(`/profiles/${id}`);
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/profiles/`
        );
        const data = await response.json();
        setProfilesData(data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {profilesData.map((profile) => (
        <Grid item xs={12} sm={6} md={4} key={profile.id}>
          <Card
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <CardActionArea
              onClick={() => handleProfileClick(profile.id)}
              sx={{ height: "100%" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  p: 2,
                }}
              >
                <Avatar
                  src={profile.picture || ""}
                  alt={profile.name}
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "8px",
                    bgcolor: "grey.300",
                    color: "white",
                  }}
                >
                  {profile.picture ? null : <PersonIcon />}
                </Avatar>

                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                  {profile.name}
                </Typography>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Profiles;
