import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

locationSchema.index({ location: '2dsphere' });

export default mongoose.model('Location', locationSchema);