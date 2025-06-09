import Report from '../models/report.model.js';
import cloudinary from '../config/cloudinary.js';
 
export const createReport = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is missing' });
    }

    const { type, title, subtitle, time, location, date, actualTime, description } = req.body;
    let { icon, images: imageFiles } = req.body || {};

    if (!type || !title || !time || !location || !date || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Upload icon to Cloudinary if provided
    let iconUrl = '';
    if (icon) {
      const uploadResponse = await cloudinary.uploader.upload(icon, {
        folder: 'report_icons',
      });
      iconUrl = uploadResponse.secure_url;
    }

    // Upload images to Cloudinary if provided
    let imageUrls = [];
    if (imageFiles && Array.isArray(imageFiles)) {
      for (const image of imageFiles) {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: 'report_images',
        });
        imageUrls.push(uploadResponse.secure_url);
      }
    }

    const newReport = new Report({
      type,
      title,
      subtitle,
      time,
      icon: iconUrl,
      location,
      date,
      actualTime,
      images: imageUrls,
      description
    });

    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};