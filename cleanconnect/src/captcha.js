// captcha.js
// This file contains functions for generating and validating CAPTCHA text.

// Function to generate a random CAPTCHA string
export const generateCaptcha = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Characters to use in CAPTCHA
  let captcha = ""; // Initialize an empty string for the CAPTCHA
  for (let i = 0; i < 6; i++) {
    // Loop 6 times to generate a 6-character CAPTCHA
    captcha += chars[Math.floor(Math.random() * chars.length)]; // Append a random character
  }
  return captcha; // Return the generated CAPTCHA
};

// Function to validate user input against the CAPTCHA text
export const validateCaptcha = (userInput, captchaText) => {
  return userInput === captchaText; // Return true if the input matches the CAPTCHA, otherwise false
};