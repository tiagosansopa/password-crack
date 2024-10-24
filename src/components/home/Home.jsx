import React from "react";
import { Button, Box, Typography } from "@mui/material";

const Home = ({ onLogout }) => {
  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Password Cracker
      </Typography>
      <Button variant="contained" color="primary" onClick={onLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Home;
