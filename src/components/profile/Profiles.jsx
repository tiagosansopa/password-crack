import { React, useEffect } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { profilesData } from "../../assets/test";

const Profiles = () => {
  const navigate = useNavigate();

  const handleProfileClick = (id) => {
    navigate(`/profiles/${id}`);
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/profiles`
        );
        const data = await response.json();
        console.error("the profiles:", data);
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
          <Card>
            <CardActionArea onClick={() => handleProfileClick(profile.id)}>
              <CardMedia
                component="img"
                height="150"
                image={profile.picture}
                alt={profile.name}
              />
              <CardContent>
                <Typography variant="h6">{profile.name}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Profiles;
