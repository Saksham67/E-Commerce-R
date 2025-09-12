// backend/controllers/authController.js
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

/**
 * POST /api/auth/register
 * body: { name, email, password, phone?, address? }
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password, phone, address });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    }

    return res.status(400).json({ message: "Invalid user data" });
  } catch (error) {
    console.error("registerUser error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/auth/login
 * body: { email, password }
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    }

    return res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    console.error("loginUser error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/auth/profile
 * protected route -> uses protect middleware
 */
export const getUserProfile = async (req, res) => {
  try {
    // protect middleware sets req.user
    if (!req.user) return res.status(401).json({ message: "Not authorized" });

    const user = req.user; // already excludes password in middleware
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    });
  } catch (error) {
    console.error("getUserProfile error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
