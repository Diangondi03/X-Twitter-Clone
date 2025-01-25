const bcrypt = require('bcrypt');
const jwt  =require("jsonwebtoken")
const db = require('../config/db'); // Import the PostgreSQL pool
const asyncHandler = require("../middleware/asyncHandler")


const JWT_SECRET = 'your_jwt_secret';

// Register user controller function
exports.registerUser = asyncHandler(async (req, res) => {
  const { username,name, email, password } = req.body;

  const image = req.file ? `/uploads/${req.file.filename}` : null;

  // Check if the email already exists
  const userCheckQuery = 'SELECT * FROM users WHERE email = $1';
  const userCheckResult = await db.query(userCheckQuery, [email]);

  if (userCheckResult.rows.length > 0) {
    return res.status(400).json({ message: 'Email is already in use' });
  }

  // Hash the password securely
  const password_hash = await bcrypt.hash(password, 10);

  // Insert the new user into the database
  const insertUserQuery = `
    INSERT INTO users (username, name, email, profile_image_url, password_hash)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, username,name, email;
  `;

  const newUser = await db.query(insertUserQuery, [username,name, email,image, password_hash]);
  res.status(201).json({
    message: 'User registered successfully',
    user: newUser.rows[0],
  });
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database
  const userCheckQuery = 'SELECT * FROM users WHERE email = $1';
  const userCheckResult = await db.query(userCheckQuery, [email]);

  if (userCheckResult.rows.length === 0) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const user = userCheckResult.rows[0];

  // Compare the hashed password stored in the database with the password provided
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate a JWT token for the user
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      profile_image_url:user.profile_image_url,
      darkMode: user.dark_mode
    },
    JWT_SECRET,
    { expiresIn: '24h' } // Token valid for 24 hours
  );
  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      profile_image_url:user.profile_image_url,
      darkMode: user.dark_mode
    },
  });
});
