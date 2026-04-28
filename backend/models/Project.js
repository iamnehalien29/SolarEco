const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ['Residential', 'Commercial'], required: true },
  location: { type: String },
  image: { type: String }, // Cloudinary URL
  capacity: { type: String }, // e.g. "10kW"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);
