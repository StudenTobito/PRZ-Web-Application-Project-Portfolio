const mongoose = require('mongoose');
const User = require('./models/User');
const Project = require('./models/Project');
const Media = require('./models/Media');
const path = require('path');
const fs = require('fs');

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

async function seed() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Media.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Copy profile image to uploads if it exists in public folder
    const publicProfilePath = path.join(__dirname, 'public', 'profile.jpg');
    const uploadsProfilePath = path.join(uploadsDir, 'profile.jpg');
    
    if (fs.existsSync(publicProfilePath)) {
      fs.copyFileSync(publicProfilePath, uploadsProfilePath);
      console.log('📸 Copied profile image to uploads directory');
    } else {
      console.log('⚠️  Profile image not found in public folder');
    }

    // Create sample media
    const profileMedia = new Media({
      filename: 'profile.jpg',
      originalName: 'profile.jpg',
      url: '/uploads/profile.jpg',
      type: 'image',
      mimeType: 'image/jpg',
      size: fs.existsSync(uploadsProfilePath) ? fs.statSync(uploadsProfilePath).size : 0
    });
    await profileMedia.save();
    console.log('📁 Created profile media record');

    // Create sample user
    const user = new User({
      name: 'Sabri Küçük',
      email: 'sabri.kucuk001@hotmail.com',
      profileImage: 'profile.jpg',
      bio: 'I am a 4th-year Computer Engineering student passionate about building scalable web applications and solving complex problems. With a strong foundation in software engineering principles, I have hands-on experience with technologies like React, Node.js, and MongoDB. I am eager to apply my skills to real-world challenges and contribute to innovative projects.'
    });
    await user.save();
    console.log('👤 Created user: Sabri Küçük');

    // Create sample projects
    const projects = [
      {
        title: 'Full-Stack E-commerce Platform API',
        description: 'Developed a RESTful API for an e-commerce site with Node.js, Express, and MongoDB, featuring product management, user authentication, and order processing.',
        technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'REST API'],
        githubUrl: 'https://github.com/TobitoSabrito/ecommerce-api',
        liveUrl: 'https://ecommerce-api.example.com',
        owner: user._id,
        isPublic: true
      },
      {
        title: 'University Club Management System',
        description: 'A React-based web application for managing club memberships, events, and announcements, connected to a custom backend.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Material-UI'],
        githubUrl: 'https://github.com/TobitoSabrito/club-management',
        liveUrl: 'https://club-management.example.com',
        owner: user._id,
        isPublic: true
      },
      {
        title: 'Data Structures Visualizer',
        description: 'An interactive web tool built with JavaScript to visualize common data structures and algorithms like sorting, trees, and graphs.',
        technologies: ['JavaScript', 'HTML5', 'CSS3', 'Canvas API', 'Algorithms'],
        githubUrl: 'https://github.com/TobitoSabrito/ds-visualizer',
        liveUrl: 'https://ds-visualizer.example.com',
        owner: user._id,
        isPublic: true
      },
      {
        title: 'Portfolio Website',
        description: 'A modern portfolio website built with React and Node.js, featuring project showcase, contact form, and responsive design.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Docker'],
        githubUrl: 'https://github.com/TobitoSabrito/portfolio',
        liveUrl: 'https://sabrikucuk.com',
        owner: user._id,
        isPublic: true
      }
    ];

    const createdProjects = [];
    for (const projectData of projects) {
      const project = new Project(projectData);
      await project.save();
      createdProjects.push(project);
      console.log(`📂 Created project: ${project.title}`);
    }

    // Update user with projects
    user.projects = createdProjects.map(p => p._id);
    await user.save();
    console.log('🔗 Linked projects to user');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log(`📊 Created ${createdProjects.length} projects`);
    console.log(`👤 Created 1 user`);
    console.log(`📁 Created 1 media record`);
    
    // Display sample data
    console.log('\n📋 Sample Data Summary:');
    console.log('User:', {
      name: user.name,
      email: user.email,
      projectsCount: user.projects.length
    });
    
    console.log('\nProjects:');
    createdProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title} - ${project.technologies.join(', ')}`);
    });

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

// Run the seed function
seed(); 