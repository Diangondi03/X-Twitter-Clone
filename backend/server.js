const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const postRoutes = require("./routes/post")
const userRoutes = require("./routes/user")
const searchRoutes = require("./routes/search")
const cors = require("cors")
const db = require('./config/db');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require("./middleware/authMiddleware")

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())



// Use the authentication routes
app.use('/api', authRoutes);
app.use('/api/posts',authMiddleware, postRoutes); // Protect post routes
app.use('/api/users',authMiddleware, userRoutes); // Protect user routes
app.use('/api/search', searchRoutes); // Protect search routes

app.use(errorHandler)

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
