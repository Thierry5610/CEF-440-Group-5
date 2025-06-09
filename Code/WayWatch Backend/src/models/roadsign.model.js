import mongoose from 'mongoose';

const roadSignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Road sign name is required'],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Road sign description is required'],
    trim: true,
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  category: {
    type: String,
    enum: ['warning', 'regulatory', 'informatory', 'other'],
    default: 'other',
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

roadSignSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('RoadSign', roadSignSchema);