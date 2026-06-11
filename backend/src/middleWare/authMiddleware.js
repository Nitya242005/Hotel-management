import jwt from "jsonwebtoken";

import User from "../models/user.js";
import { OFFLINE_USERS } from "../utils/offlineStore.js";

// Verifies the Bearer JWT and attaches the user to req.user.
export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = null;
    let isOffline = false;
    try {
      user = await User.findById(decoded.id).select("-password");
    } catch (dbErr) {
      console.warn("Database verification failed in authMiddleware, using offline verification:", dbErr.message);
      isOffline = true;
    }

    // Fallback if DB is offline or user was only registered in-memory offline
    if (isOffline || !user) {
      const offlineUser = OFFLINE_USERS.find((u) => u.id === decoded.id);
      if (offlineUser) {
        req.user = {
          _id: offlineUser.id,
          name: offlineUser.name,
          email: offlineUser.email,
          role: offlineUser.role,
        };
        return next();
      }
    }

    if (!user) {
      return res.status(401).json({ success: false, message: "User no longer exists" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};

// Restrict a route to admins only (use after `protect`).
export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin access required" });
  }
  next();
};
