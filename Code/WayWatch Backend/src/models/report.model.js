// src/models/Report.js

import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  type: { // Corresponds to newReport.type (e.g., 'accident', 'road_block')
    type: String,
    required: [true, 'Incident type is required'],
    trim: true,
  },
  description: { // Corresponds to newReport.description
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  location: { // Corresponds to newReport.location (address string)
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  hasInjuries: { // Corresponds to newReport.hasInjuries
    type: Boolean,
    default: null, // Can be true, false, or null if not answered
  },
  images: [ // Corresponds to newReport.images (array of URLs)
    {
      type: String, // Store Cloudinary URLs here
    }
  ],
  // --- NEW FIELD: Link to User ---
  reportedBy: {
    type: mongoose.Schema.ObjectId, // This is a reference to an ObjectId
    ref: 'User', // This tells Mongoose that it refers to the 'User' model
    required: true, // A report must be linked to a user
  },
  // --- End NEW FIELD ---
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update `updatedAt` on save
reportSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Report = mongoose.model('Report', reportSchema);

export default Report;