import Report from '../models/report.model.js';  // Make sure path matches your project structure
import cloudinary from '../config/cloudinary.js';
import asyncHandler from '../middlewares/async.middleware.js';

// Helper to upload a buffer to Cloudinary
const uploadToCloudinary = async (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    ).end(fileBuffer);
  });
};

// @desc    Create a new incident report (no auth required)
export const createReport = asyncHandler(async (req, res) => {
  // User might be undefined if no authentication middleware is used
  // So, set reportedBy conditionally:
  const userId = req.user?._id || null;

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

  // Icon upload optional, if used
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
    reportedBy: userId,
    // iconUrl: uploadedIconUrl, // uncomment if your model has this field
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
export const getAllReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({}).populate('reportedBy', 'username email');
  res.status(200).json({
    status: 'success',
    count: reports.length,
    data: reports,
  });
});


// @desc    Get a single incident report by ID
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
export const updateReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) {
    res.status(404);
    throw new Error('Report not found');
  }

  // If req.user is defined and you want to protect update:
  if (req.user && report.reportedBy?.toString() !== req.user._id.toString()) {
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
export const deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) {
    res.status(404);
    throw new Error('Report not found');
  }

  if (req.user && report.reportedBy?.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this report');
  }

  await report.remove();
  res.status(200).json({
    status: 'success',
    message: 'Report deleted successfully',
  });
});
