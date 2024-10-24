import React from "react";
import { Typography, Box, Button, Card, CardContent } from "@mui/material";

const MyStats = ({ name, username, email, onLogout }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ maxWidth: 400, mx: "auto", p: 3, borderRadius: "8px" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            My Profile
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Name:</strong> {name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Username:</strong> {username}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> {email}
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
