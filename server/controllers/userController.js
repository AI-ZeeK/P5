import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import UserSchema from "../models/userModel.js";

// @desc Register new user
// @routes Post /api/user
// @access Private
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  // Check if user exists
  const userExists = await UserSchema.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //Bcrypt hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await UserSchema.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Authentivate a User
// @routes Post /api/users/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await UserSchema.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

export const githublogin = asyncHandler(async (req, res) => {
  if (req.isAuthenticated()) {
    res.send("You are logged in!");
  } else {
    res.send("You are not logged in.");
  }
});

export const googlelogin = asyncHandler(async (req, res) => {
  const { familyName, givenName, email } = req.body;
  if (!familyName || !givenName || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const user = await UserSchema.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User Not Found");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});
export const googleregister = asyncHandler(async (req, res) => {
  const { familyName, givenName, email, googleId, password } = req.body;
  if (!familyName || !givenName || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const user = await UserSchema.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already registered");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await UserSchema.create({
    name: `${familyName} ${givenName}`,
    email,
    googleId,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
// @desc Get User data
// @routes Get /api/users/user
// @access Private
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// ?Generate a token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
