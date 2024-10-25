import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  Card,
  CardContent,
} from "@mui/material";

import { passwordRequirements } from "../assets/test";

const PasswordTesterForm = () => {
  const [regex, setRegex] = useState("");
  const [passwordsTested, setPasswordsTested] = useState(0);
  const [possiblePasswords, setPossiblePasswords] = useState(0);
  const [attemptsMade, setAttemptsMade] = useState(0);
  const [passwordCracked, setPasswordCracked] = useState(null);
  const [result, setResult] = useState(null);

  async function validatePasswordGuess(id, pattern, maxAttempts) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/validate-password/${id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pattern: pattern,
            max_attempts: maxAttempts,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Response:", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleSubmit = async () => {
    const id = 1;
    const maxAttempts = 500000;
    const response = await validatePasswordGuess(id, regex, maxAttempts);
    console.log(response);
    setResult(response);
  };

  // Assume passwordType is 3 for this example
  const passwordType = 3;

  // Function to handle regex testing (dummy logic for now)
  const handleTest = () => {
    setPasswordsTested(passwordsTested + 1);
    setPossiblePasswords(50); // Just an example number
    setAttemptsMade(attemptsMade + 1);

    // Dummy condition to simulate password cracking
    if (regex === "correct-regex") {
      setPasswordCracked(true);
    } else {
      setPasswordCracked(false);
    }
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

      {/* Form Section for Regex Testing */}
      <Box
        sx={{
          width: "50%",
          borderRadius: "8px",
          p: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Test your Regular Expression
        </Typography>

        <TextField
          label="Regular Expression"
          variant="outlined"
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
        >
          Test
        </Button>

        {/* Display Results */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">
            Passwords tested: {passwordsTested}
          </Typography>
          <Typography variant="body1">
            All possible passwords with that regex: {possiblePasswords}
          </Typography>
          <Typography variant="body1">
            Cantidad de intentos hechos: {attemptsMade}
          </Typography>
        </Box>

        {result && (
          <div>
            <h3>Result</h3>
            <p>{result.message}</p>
          </div>
        )}

        {/* Conditional Message */}
        {passwordCracked !== null &&
          (passwordCracked ? (
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
              <Typography>Password cracked!</Typography>
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
              <Typography>Password not cracked yet.</Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default PasswordTesterForm;
