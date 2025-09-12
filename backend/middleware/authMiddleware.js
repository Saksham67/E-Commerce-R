// backend/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
  let token;

  try {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // decoded has { id, role }
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) return res.status(401).json({ message: "User not found" });

      return next();
    }

    return res.status(401).json({ message: "Not authorized, token missing" });
  } catch (error) {
    console.error("protect middleware error:", error);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Admin access only" });
};
