import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";

const createUserToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: "user",
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};

const createAdminToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      role: "admin",
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};

// register normal user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const userEmail = email.toLowerCase().trim();

    const userExists = await User.findOne({
      email: userEmail,
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const adminExists = await Admin.findOne({
      email: userEmail,
    });

    if (adminExists) {
      return res.status(400).json({
        message: "Account already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: userEmail,
      password: hashedPassword,
    });

    const token = createUserToken(user);

    res.status(201).json({
      message: "Registration successful",
      role: "user",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: "user",
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// login for both admin and user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const userEmail = email.toLowerCase().trim();

    const admin = await Admin.findOne({
      email: userEmail,
    });

    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const token = createAdminToken(admin);

      return res.json({
        message: "Login successful",
        role: "admin",
        token,
        user: {
          _id: admin._id,
          name: admin.name || "Admin",
          email: admin.email,
          role: "admin",
        },
      });
    }

    const user = await User.findOne({
      email: userEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = createUserToken(user);

    res.json({
      message: "Login successful",
      role: "user",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: "user",
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// logged in user details
export const getMe = async (req, res) => {
  res.json(req.user);
};
