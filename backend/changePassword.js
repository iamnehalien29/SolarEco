const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const updateAdmin = async () => {
  try {
    // Connect to Cloud Database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find the current admin
    const admin = await User.findOne({ username: 'admin' });

    if (!admin) {
      console.log('❌ Admin user not found.');
      process.exit(1);
    }

    // UPDATE YOUR CREDENTIALS HERE 👇
    admin.username = 'Faham'
    admin.password = 'fk@2026gmk';
    // Save the changes
    await admin.save();
    console.log(`✅ Admin credentials updated! New Username: ${admin.username}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating admin:', error);
    process.exit(1);
  }
};

updateAdmin();
