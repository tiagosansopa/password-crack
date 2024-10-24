import React from "react";
import { Typography, Box } from "@mui/material";

const Instructions = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Instructions
      </Typography>
      <Typography>
        Here are some instructions on how to use the application. Follow these
        steps to get started...
      </Typography>
    </Box>
  );
};

export default Instructions;
