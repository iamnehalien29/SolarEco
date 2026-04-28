const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  siteName: { type: String, default: "SolarEco" },
  whatsapp: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  googleMapsUrl: { type: String }, // Embed URL
  socialLinks: {
    facebook: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
  },
  seo: {
    title: { type: String },
    description: { type: String },
    keywords: [String],
  }
});

module.exports = mongoose.model('Settings', SettingsSchema);
