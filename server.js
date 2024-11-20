const express = require("express");
const path = require("path");
const connectDB = require("./db"); // Correct import for DB connection

const app = express();
app.use(express.json());  // Middleware to parse incoming JSON requests

// Connect to the database
connectDB();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));  // This will serve static files like HTML, CSS, and JS

// API Root route to check if the server is running
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Import and use routers for different API routes
const userRouter = require('./routes/users');
app.use('/api/users', userRouter);  // This will handle '/api/users'

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);  // This will handle '/api/auth'

const postRouter = require('./routes/posts');
app.use('/api/posts', postRouter);  // This will handle '/api/posts'

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
