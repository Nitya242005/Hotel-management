import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import { OFFLINE_USERS } from "../utils/offlineStore.js";

export const registeruser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email and password",
      });
    }

    let existingUser = null;
    let isOffline = false;

    try {
      existingUser = await User.findOne({ email });
    } catch (dbErr) {
      console.warn("Database lookup failed during registration, falling back to mock registration:", dbErr.message);
      isOffline = true;
    }

    // Fallback if DB is offline
    if (isOffline) {
      const emailLower = email.toLowerCase();
      // Check in-memory database
      const exists = OFFLINE_USERS.find((u) => u.email.toLowerCase() === emailLower);
      if (exists) {
        return res.status(400).json({
          sucess: false,
          message: "User with this email already exists (Offline Fallback)",
        });
      }

      const mockUserId = `60c72b2f9b1d8b2d${Math.floor(Math.random() * 100000000).toString(16).padStart(8, '0')}`;
      const newUser = {
        id: mockUserId,
        name,
        email: emailLower,
        password, // Store plain text for in-memory comparisons
        role: "user",
      };
      OFFLINE_USERS.push(newUser);

      return res.status(201).json({
        sucess: true,
        message: "User registered successfully (Offline Fallback)",
        token: generateToken(mockUserId),
        user: {
          id: mockUserId,
          name: name,
          email: emailLower,
          role: "user",
        },
      });
    }

    if (existingUser) {
      return res.status(400).json({
        sucess: false,
        message: "User with this email already exists",
      });
    }
    const user = await User.create({ name, email, password });
    return res.status(201).json({
      sucess: true,
      message: "User registered successfully",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const loginuser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    let user = null;
    let isOffline = false;
    
    try {
      user = await User.findOne({ email });
    } catch (dbErr) {
      console.warn("Database lookup failed, falling back to mock authentication:", dbErr.message);
      isOffline = true;
    }

    // Fallback if DB is offline or lookup failed
    if (isOffline || !user) {
      const emailLower = email.toLowerCase();
      const offlineUser = OFFLINE_USERS.find(
        (u) => u.email.toLowerCase() === emailLower && u.password === password
      );

      if (offlineUser) {
        return res.status(200).json({
          sucess: true,
          message: "User logged in successfully (Offline Fallback)",
          token: generateToken(offlineUser.id),
          user: {
            id: offlineUser.id,
            name: offlineUser.name,
            email: offlineUser.email,
            role: offlineUser.role,
          },
        });
      } else {
        return res.status(400).json({
          sucess: false,
          message: "Invalid email or password (Offline Fallback)",
        });
      }
    }

    if (!user) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
      sucess: true,
      message: "User logged in successfully",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};
