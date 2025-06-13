const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const professionalRoutes = require('./routes/professionalRoutes');
const jobRoutes = require('./routes/jobRoutes');
const searchRoutes = require('./routes/searchRoutes');
const messageRoutes = require('./routes/messageRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const { errorHandler } = require('./utils/errorHandler');
const categoryRoutes = require('./routes/categories');

dotenv.config();
const app = express();

// Middleware setup (order matters!)
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies (replaces express.json())
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/professional', professionalRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/categories', categoryRoutes);

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));