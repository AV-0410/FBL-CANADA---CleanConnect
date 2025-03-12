// CaptchaComponent.js
// This file defines the CAPTCHA verification component.

import React, { useRef, useState, useEffect } from "react"; // Import React hooks
import { Button, Container, Box, Typography, TextField } from "@mui/material"; // Import Material-UI components
import { generateCaptcha, validateCaptcha } from "../captcha/captcha"; // Import CAPTCHA functions

// CaptchaComponent
const CaptchaComponent = ({ onVerify }) => {
  const [captchaText, setCaptchaText] = useState(""); // State for CAPTCHA text
  const [userInput, setUserInput] = useState(""); // State for user input
  const [error, setError] = useState(""); // State for error messages
  const canvasRef = useRef(null); // Ref for the CAPTCHA canvas

  // Function to generate a new CAPTCHA
  const generateNewCaptcha = () => {
    const captcha = generateCaptcha(); // Generate CAPTCHA text
    setCaptchaText(captcha); // Set the CAPTCHA text state

    // Draw the CAPTCHA on the canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 200, 50); // Clear the canvas
    ctx.font = "30px Arial"; // Set font
    ctx.fillStyle = "#38a169"; // Set text color
    ctx.fillText(captcha, 50, 35); // Draw the CAPTCHA text
  };

  // Handle user input changes
  const handleInputChange = (e) => {
    setUserInput(e.target.value); // Update user input state
  };

  // Handle CAPTCHA verification
  const handleVerify = () => {
    if (validateCaptcha(userInput, captchaText)) {
      onVerify(true); // Notify parent component that CAPTCHA is valid
    } else {
      setError("Invalid captcha. Please try again."); // Set error message
      generateNewCaptcha(); // Generate a new CAPTCHA
    }
  };

  // Generate CAPTCHA on component mount
  useEffect(() => {
    generateNewCaptcha();
  }, []);

  return (
    <Container style={{ textAlign: "center", padding: "2rem" }}>
      <Typography variant="h4" gutterBottom style={{ color: "#2d3748", fontWeight: "bold" }}>
        Captcha Verification
      </Typography>
      <Typography variant="body1" style={{ color: "#4a5568", marginBottom: "2rem" }}>
        Please enter the text you see below:
      </Typography>

      {/* CAPTCHA Image */}
      <Box style={{ marginBottom: "2rem" }}>
        <canvas ref={canvasRef} width="200" height="50" style={{ border: "1px solid #ccc" }} />
      </Box>

      {/* User Input */}
      <TextField
        label="Enter Captcha"
        fullWidth
        margin="normal"
        value={userInput}
        onChange={handleInputChange}
      />

      {/* Error Message */}
      {error && (
        <Typography variant="body2" style={{ color: "red", marginTop: "1rem" }}>
          {error}
        </Typography>
      )}

      {/* Verify Button */}
      <Button
        variant="contained"
        style={{
          backgroundColor: "#38a169",
          color: "white",
          marginTop: "2rem",
          padding: "0.75rem 2rem",
          fontSize: "1.1rem",
          fontWeight: "bold",
        }}
        onClick={handleVerify}
      >
        Verify
      </Button>
    </Container>
  );
};

export default CaptchaComponent; // Export the CaptchaComponent