import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";

import { passwordRequirements } from "../assets/test";

const PasswordTesterForm = ({ id }) => {
  const [regex, setRegex] = useState("");
  const [passwordsTested, setPasswordsTested] = useState(0);
  const [attemptsMade, setAttemptsMade] = useState(0);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function validatePasswordGuess(id, pattern, maxAttempts) {
    try {
      const url = `${import.meta.env.VITE_API_URL}/validate-password/${id}/`;
      const body = new URLSearchParams({
        pattern: pattern,
        max_attempts: maxAttempts.toString(),
      });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleSubmit = async () => {
    setLoading(true);
    const maxAttempts = 100000;
    const response = await validatePasswordGuess(id, regex, maxAttempts);
    console.log(response);
    setResult(response);
    setLoading(false);
  };

  // Assume passwordType is 3 for this example
  const passwordType = 3;

  const handleTest = () => {
    setAttemptsMade(attemptsMade + 1);
  };

  return (
    <Box sx={{ p: 3, display: "flex", gap: 2 }}>
      {/* Password Requirements Section */}
      <Box
        sx={{
          width: "50%",
          borderRadius: "8px",
          p: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Password Requirements:
        </Typography>
        <List>
          {passwordRequirements[passwordType].map((requirement, index) => (
            <ListItem key={index}>• {requirement}</ListItem>
          ))}
        </List>
      </Box>

      <Box
        sx={{
          width: "50%",
          borderRadius: "8px",
          p: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Ingresar expresion regular
        </Typography>

        <TextField
          label=""
          variant="outlined"
          placeholder="Ejemplo [a-z]{8}"
          fullWidth
          value={regex}
          onChange={(e) => setRegex(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleTest();
            handleSubmit();
          }}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null} // Show CircularProgress when loading
        >
          {loading ? "Testing..." : "Test"}
        </Button>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">
            Cantidad de intentos realizados: {attemptsMade}
          </Typography>
        </Box>

        {result &&
          (result.success ? (
            <Box
              sx={{
                backgroundColor: "green",
                color: "white",
                p: 2,
                mt: 2,
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <Typography>{result.message}</Typography>
            </Box>
          ) : (
            <Box
              sx={{
                backgroundColor: "red",
                color: "white",
                p: 2,
                mt: 2,
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <Typography>{result.message}</Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default PasswordTesterForm;
