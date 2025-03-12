// src/achievements.js
export const achievements = [
    {
      id: 1,
      name: "Newbie",
      description: "Join your first event",
      condition: (user) => user.joinedEvents?.length >= 1,
      badge: "🥳", // Emoji or image URL
    },
    {
      id: 2,
      name: "Event Enthusiast",
      description: "Join 5 events",
      condition: (user) => user.joinedEvents?.length >= 5,
      badge: "🎉",
    },
    {
      id: 3,
      name: "Organizer",
      description: "Organize 3 events",
      condition: (user) => {
        const events = JSON.parse(localStorage.getItem("events")) || [];
        return events.filter((event) => event.creator === user.email).length >= 3;
      },
      badge: "📅",
    },
    {
      id: 4,
      name: "Consistent Participant",
      description: "Join 10 events in a row",
      condition: (user) => user.joinedEvents?.length >= 10,
      badge: "🏆",
    },
  ];