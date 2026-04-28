require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const User = require('./models/User');

const projects = [
  {
    title: "10kW Villa Installation",
    category: "Residential",
    location: "Gurugram, Haryana",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop",
    capacity: "10kW",
  },
  {
    title: "100kW Factory Grid",
    category: "Commercial",
    location: "Bhiwadi, Rajasthan",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1975&auto=format&fit=crop",
    capacity: "100kW",
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB for seeding');
    await Project.deleteMany({});
    await Project.insertMany(projects);
    
    // Seed Admin User
    await User.deleteMany({});
    const admin = new User({ username: 'admin', password: 'admin123' });
    await admin.save();
    
    console.log('✅ Database seeded (Projects + Admin User)!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
