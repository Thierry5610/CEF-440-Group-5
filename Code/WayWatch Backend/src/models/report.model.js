import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  type: { // Incident type (e.g., 'accident', 'road_block')
    type: String,
    required: [true, 'Incident type is required'],
    trim: true,
  },
  description: { // Description of incident
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  location: { // Location/address string
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  hasInjuries: { // true, false, or null if unknown
    type: Boolean,
    default: null,
  },
  images: [ // Array of Cloudinary image URLs
    {
      type: String,
    }
  ],
  reportedBy: { // Link to user (optional now)
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: false, // changed to optional
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-update 'updatedAt' on save
reportSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Report = mongoose.model('Report', reportSchema);

export default Report;
