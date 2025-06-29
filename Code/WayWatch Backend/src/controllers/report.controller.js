// src/controllers/report.controller.js

import Report from '../models/report.model.js';
import {User} from '../models/user.model.js';
import cloudinary from '../config/cloudinary.js';
import asyncHandler from '../middlewares/async.middleware.js';

const uploadToCloudinary = async (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: folder, resource_type: 'auto' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    ).end(fileBuffer);
  });
};

// @desc    Create a new incident report
// @route   POST /api/v1/reports
// @access  Private
export const createReport = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    res.status(401);
    throw new Error('Not authorized, user not found.');
  }

  const { type, description, location, hasInjuries } = req.body;

  if (!type || !description || !location) {
    res.status(400);
    throw new Error('Please provide incident type, description, and location.');
  }

  const uploadedImageUrls = [];
  const files = req.files;

  if (files && files.images && files.images.length > 0) {
    for (const imageFile of files.images) {
      try {
        const imageUrl = await uploadToCloudinary(imageFile.buffer, 'report_images');
        uploadedImageUrls.push(imageUrl);
      } catch (uploadError) {
        console.error('Cloudinary image upload error:', uploadError);
      }
    }
  }

  let uploadedIconUrl = '';
  if (files && files.icon && files.icon.length > 0) {
    try {
      uploadedIconUrl = await uploadToCloudinary(files.icon[0].buffer, 'report_icons');
    } catch (uploadError) {
      console.error('Cloudinary icon upload error:', uploadError);
    }
  }

  const newReport = new Report({
    type,
    description,
    location,
    hasInjuries: hasInjuries === 'true' ? true : (hasInjuries === 'false' ? false : null),
    images: uploadedImageUrls,
    reportedBy: req.user._id,
    // iconUrl: uploadedIconUrl, // Uncomment if storing icon URL
  });

  const savedReport = await newReport.save();
  const populatedReport = await Report.findById(savedReport._id).populate('reportedBy', 'username email');

  res.status(201).json({
    status: 'success',
    message: 'Incident report created successfully',
    data: populatedReport,
  });
});

// @desc    Get all incident reports
// @route   GET /api/v1/reports
// @access  Public
export const getAllReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({}).populate('reportedBy', 'username email');
  res.status(200).json({
    status: 'success',
    count: reports.length,
    data: reports,
  });
});

// @desc    Get a single incident report by ID
// @route   GET /api/v1/reports/:id
// @access  Public
export const getReportById = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id).populate('reportedBy', 'username email');

  if (!report) {
    res.status(404);
    throw new Error('Report not found');
  }

  res.status(200).json({
    status: 'success',
    data: report,
  });
});

// @desc    Update a report by ID
// @route   PUT /api/v1/reports/:id
// @access  Private
export const updateReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    res.status(404);
    throw new Error('Report not found');
  }

  if (!req.user || report.reportedBy.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this report');
  }

  const { type, description, location, hasInjuries } = req.body;
  if (type !== undefined) report.type = type;
  if (description !== undefined) report.description = description;
  if (location !== undefined) report.location = location;
  if (hasInjuries !== undefined) report.hasInjuries = hasInjuries;

  const updatedReport = await report.save();
  const populatedReport = await Report.findById(updatedReport._id).populate('reportedBy', 'username email');

  res.status(200).json({
    status: 'success',
    message: 'Report updated successfully',
    data: populatedReport,
  });
});

// @desc    Delete a report by ID
// @route   DELETE /api/v1/reports/:id
// @access  Private
export const deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    res.status(404);
    throw new Error('Report not found');
  }

  if (!req.user || report.reportedBy.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this report');
  }

  await report.remove();
  res.status(200).json({
    status: 'success',
    message: 'Report deleted successfully',
  });
});
