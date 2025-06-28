const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Project = require('./models/Project');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/portfolio';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err.message));

// Sample projects data (fallback)
const sampleProjects = [
  {
    _id: '1',
    title: 'Full-Stack E-commerce Platform API',
    description: 'Developed a RESTful API for an e-commerce site with Node.js, Express, and MongoDB, featuring product management, user authentication, and order processing.'
  },
  {
    _id: '2',
    title: 'University Club Management System',
    description: 'A React-based web application for managing club memberships, events, and announcements, connected to a custom backend.'
  },
  {
    _id: '3',
    title: 'Data Structures Visualizer',
    description: 'An interactive web tool built with JavaScript to visualize common data structures and algorithms like sorting, trees, and graphs.'
  },
];

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    if (projects.length === 0) {
      // If DB is connected but has no projects, return sample data
      return res.json(sampleProjects);
    }
    res.json(projects);
  } catch (err) {
    // If DB connection or query fails, log it and return sample data as a fallback
    console.error("Database error, returning sample projects as fallback:", err.message);
    res.json(sampleProjects);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
}); 