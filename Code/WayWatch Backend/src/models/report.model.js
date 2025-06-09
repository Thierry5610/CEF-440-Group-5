import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  time: { type: String, required: true },
  icon: { type: String }, // URL from Cloudinary
  location: { type: String, required: true },
  date: { type: String, required: true },
  actualTime: { type: String },
  images: [{ type: String }], // Array of URLs from Cloudinary
  description: { type: String, required: true }
}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);
export default Report;