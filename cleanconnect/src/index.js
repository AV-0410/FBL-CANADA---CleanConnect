// index.js
// This file is the entry point for the React application.

import React from "react"; // Import React
import ReactDOM from "react-dom/client"; // Import ReactDOM
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter for routing
import App from "./App"; // Import the App component
import "./index.css"; // Import styles

// Create a root element and render the App component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap App in BrowserRouter for routing */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);