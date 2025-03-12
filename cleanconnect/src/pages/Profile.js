// Profile.js
// This file defines the Profile component, which displays user information and achievements.

import React, { useEffect, useState } from "react"; // Import React hooks
import { Typography, Container, Box, Button, List, ListItem, ListItemText, Avatar, Paper, Snackbar } from "@mui/material"; // Import Material-UI components
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { achievements } from "../achievements"; // Import achievements
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import checkmark icon
import { db, auth } from "../firebase"; // Import Firebase services
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; // Import Firestore functions
import { TwitterShareButton, TwitterIcon } from "react-share"; // Import Twitter sharing components

// Profile component
const Profile = ({ user }) => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [notifications, setNotifications] = useState([]); // State for notifications
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar visibility
  const [joinedEvents, setJoinedEvents] = useState([]); // State for joined events
  const [userAchievements, setUserAchievements] = useState([]); // State for user achievements

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setJoinedEvents(userData.joinedEvents || []);
          setUserAchievements(userData.achievements || []); // Fetch achievements
        }
      }
    };

    fetchUserData();
  }, [user]);

  // Handle leaving an event
  const handleLeaveEvent = async (eventId) => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        joinedEvents: arrayRemove(eventId),
      });

      alert("You have left the event.");
      setJoinedEvents((prevEvents) => prevEvents.filter((id) => id !== eventId)); // Update local state
    } catch (error) {
      console.error("Error leaving event:", error);
      alert("Failed to leave the event. Please try again.");
    }
  };

  // Check for achievements
  useEffect(() => {
    const checkAchievements = async () => {
      if (user) {
        const unlockedAchievements = achievements.filter((achievement) => {
          const isUnlocked = achievement.condition({ joinedEvents });
          const isAlreadyUnlocked = userAchievements.includes(achievement.id);
          return isUnlocked && !isAlreadyUnlocked;
        });

        if (unlockedAchievements.length > 0) {
          // Add unlocked achievements to the user's profile
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            achievements: arrayUnion(...unlockedAchievements.map((a) => a.id)),
          });

          // Update local state
          setUserAchievements((prevAchievements) => [
            ...prevAchievements,
            ...unlockedAchievements.map((a) => a.id),
          ]);

          // Show notifications for unlocked achievements
          setNotifications(unlockedAchievements.map((a) => `${a.badge} ${a.name}: ${a.description}`));
          setOpenSnackbar(true);
        }
      }
    };

    checkAchievements();
  }, [user, joinedEvents, userAchievements]);

  return (
    <Container style={{ padding: "2rem", textAlign: "center" }}>
      <Paper elevation={3} style={{ padding: "2rem", borderRadius: "10px", backgroundColor: "#f7fafc" }}>
        <Typography variant="h4" gutterBottom style={{ color: "#2d3748", fontWeight: "bold" }}>
          Your Profile
        </Typography>
        {user ? (
          <Box>
            {/* User Avatar and Email */}
            <Box display="flex" alignItems="center" justifyContent="center" marginBottom="2rem">
              <Avatar
                sx={{
                  bgcolor: "#38a169", // Green color
                  width: 56,
                  height: 56,
                  marginRight: "1rem",
                }}
              >
                {user.email[0].toUpperCase()} {/* Display the first letter of the email */}
              </Avatar>
              <Typography variant="h6" style={{ color: "#2d3748" }}>
                {user.email}
              </Typography>
            </Box>

            {/* Joined Events Section */}
            <Typography variant="h5" gutterBottom style={{ color: "#2d3748", fontWeight: "bold", marginTop: "1rem" }}>
              Joined Events
            </Typography>
            {joinedEvents.length > 0 ? (
              <List>
                {joinedEvents.map((eventId) => (
                  <ListItem
                    key={eventId}
                    style={{
                      backgroundColor: "#ffffff",
                      marginBottom: "1rem",
                      borderRadius: "10px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <ListItemText
                      primary={`Event ID: ${eventId}`} // Replace with actual event data
                    />
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#e53e3e", // Red color
                        color: "white",
                        fontWeight: "bold",
                        marginLeft: "1rem",
                      }}
                      onClick={() => handleLeaveEvent(eventId)}
                    >
                      Leave Event
                    </Button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1" style={{ color: "#4a5568" }}>
                You haven't joined any events yet.
              </Typography>
            )}

            {/* Achievements Section */}
            <Typography variant="h5" gutterBottom style={{ color: "#2d3748", fontWeight: "bold", marginTop: "2rem" }}>
              Achievements
            </Typography>
            <Box>
              {achievements.map((achievement) => {
                const isUnlocked = userAchievements.includes(achievement.id);

                return (
                  <Box
                    key={achievement.id}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    marginBottom="1rem"
                    padding="1rem"
                    borderRadius="10px"
                    bgcolor="#ffffff"
                    boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                  >
                    <Box>
                      <Typography variant="h6" style={{ color: "#38a169" }}>
                        {achievement.name} {achievement.badge}
                      </Typography>
                      <Typography variant="body2" style={{ color: "#4a5568" }}>
                        {achievement.description}
                      </Typography>
                    </Box>

                    {/* Checkmark for unlocked achievements */}
                    {isUnlocked && (
                      <CheckCircleIcon style={{ color: "#38a169", fontSize: "2rem" }} />
                    )}

                    {/* Twitter Share Button */}
                    {isUnlocked && (
                      <TwitterShareButton
                        url={window.location.href}
                        title={`I just unlocked the "${achievement.name}" achievement on CleanConnect!`}
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        ) : (
          <Typography variant="body1" style={{ color: "#4a5568" }}>
            Please log in to view your profile.
          </Typography>
        )}
      </Paper>

      {/* In-App Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={
          <Box>
            {notifications.map((notification, index) => (
              <Typography key={index} variant="body1">
                {notification}
              </Typography>
            ))}
          </Box>
        }
      />
    </Container>
  );
};

export default Profile; // Export the Profile component