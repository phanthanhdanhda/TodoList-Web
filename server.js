const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db'); // Kết nối DB

const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');
const auth = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', auth, todoRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
