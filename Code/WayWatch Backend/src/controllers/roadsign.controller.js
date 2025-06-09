import cloudinary from '../config/cloudinary.js';
import RoadSign from '../models/roadsign.model.js';
import { STATUS_CODES } from '../constants/statusCodes.js';
import { MESSAGES } from '../constants/messages.js';

// Helper to upload buffer to Cloudinary
const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'road-signs' },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(buffer);
  });
};

export const createRoadSign = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        status: 'error',
        message: MESSAGES.NO_FILE_UPLOADED,
      });
    }

    const result = await streamUpload(file.buffer);

    const roadSign = new RoadSign({
      name,
      description,
      imageUrl: result.secure_url,
      category,
    });

    await roadSign.save();

    res.status(STATUS_CODES.CREATED).json({
      status: 'success',
      data: roadSign,
    });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: error.message || MESSAGES.SERVER_ERROR,
    });
  }
};

export const getAllRoadSigns = async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const roadSigns = await RoadSign.find(query).select('name description imageUrl category');
    res.status(STATUS_CODES.OK).json({
      status: 'success',
      data: roadSigns,
    });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: error.message || MESSAGES.SERVER_ERROR,
    });
  }
};

// New search route handler (if separate endpoint needed)
export const searchRoadSigns = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        status: 'error',
        message: 'Search query parameter "q" is required',
      });
    }

    const roadSigns = await RoadSign.find({
      name: { $regex: q, $options: 'i' },
    }).select('name description imageUrl category');

    res.status(STATUS_CODES.OK).json({
      status: 'success',
      data: roadSigns,
    });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: error.message || MESSAGES.SERVER_ERROR,
    });
  }
};

export const getRoadSignById = async (req, res) => {
  try {
    const roadSign = await RoadSign.findById(req.params.id).select('name description imageUrl category');
    if (!roadSign) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        status: 'error',
        message: MESSAGES.ROAD_SIGN_NOT_FOUND,
      });
    }
    res.status(STATUS_CODES.OK).json({
      status: 'success',
      data: roadSign,
    });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: error.message || MESSAGES.SERVER_ERROR,
    });
  }
};

export const updateRoadSign = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const file = req.file;
    const updateData = { name, description, category, updatedAt: Date.now() };

    if (file) {
      const result = await streamUpload(file.buffer);
      updateData.imageUrl = result.secure_url;
    }

    const roadSign = await RoadSign.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!roadSign) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        status: 'error',
        message: MESSAGES.ROAD_SIGN_NOT_FOUND,
      });
    }

    res.status(STATUS_CODES.OK).json({
      status: 'success',
      data: roadSign,
    });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: error.message || MESSAGES.SERVER_ERROR,
    });
  }
};

export const deleteRoadSign = async (req, res) => {
  try {
    const roadSign = await RoadSign.findByIdAndDelete(req.params.id);
    if (!roadSign) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        status: 'error',
        message: MESSAGES.ROAD_SIGN_NOT_FOUND,
      });
    }
    res.status(STATUS_CODES.NO_CONTENT).json({
      status: 'success',
      message: MESSAGES.ROAD_SIGN_DELETED,
    });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: error.message || MESSAGES.SERVER_ERROR,
    });
  }
};
