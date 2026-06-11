// In-memory fallback user store when MongoDB Atlas is unreachable.
// Seeded with default users from seed.js
export const OFFLINE_USERS = [
  {
    id: "60c72b2f9b1d8b2d88888888",
    name: "Site Admin",
    email: "admin@forgequantum.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "60c72b2f9b1d8b2d88888889",
    name: "Quality Manager",
    email: "quality@forgequantum.com",
    password: "user1234",
    role: "user",
  },
  {
    id: "60c72b2f9b1d8b2d88888890",
    name: "Test User",
    email: "test@gmail.com",
    password: "Test@123",
    role: "user",
  },
];
