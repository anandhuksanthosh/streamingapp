const Movie = require("../models/Movie");
const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");

// Create Movie
exports.createMovie = async (req, res, next) => {
  const { title, description } = req.body;
  const thumbnailFile = req.files?.thumbnail[0];
  const videoFile = req.files?.video[0];

  try {
    // Upload thumbnail to Cloudinary
    let thumbnailUrl;
    if (thumbnailFile) {
      const uploadedThumbnail = await cloudinary.uploader.upload(
        thumbnailFile.path,
        {
          folder: "movies/thumbnails",
          resource_type: "image",
        }
      );
      thumbnailUrl = uploadedThumbnail.secure_url;
    }

    // Upload video to Cloudinary
    let videoUrl;
    if (videoFile) {
      const uploadedVideo = await cloudinary.uploader.upload(videoFile.path, {
        folder: "movies/videos",
        resource_type: "video",
      });
      videoUrl = uploadedVideo.secure_url;
    }

    // Create the movie in the database
    const movie = await Movie.create({
      title,
      description,
      thumbnail: thumbnailUrl,
      videoUrl,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: "Movie created", movie });
  } catch (error) {
    next(error);
  }
};

// Update Movie
exports.updateMovie = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const thumbnailFile = req.files?.thumbnail;
  const videoFile = req.files?.video;

  try {
    let updatedData = { title, description };

    // Handle Cloudinary uploads if files exist
    if (thumbnailFile) {
      const uploadedThumbnail = await cloudinary.uploader.upload(
        thumbnailFile[0].path,
        {
          folder: "movies/thumbnails",
          resource_type: "image",
        }
      );
      updatedData.thumbnail = uploadedThumbnail.secure_url;
    }

    if (videoFile) {
      const uploadedVideo = await cloudinary.uploader.upload(
        videoFile[0].path,
        {
          folder: "movies/videos",
          resource_type: "video",
        }
      );
      updatedData.videoUrl = uploadedVideo.secure_url;
    }

    // Update the movie
    const movie = await Movie.findByIdAndUpdate(id, updatedData, { new: true });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.status(200).json({ message: "Movie updated", movie });
  } catch (error) {
    next(error);
  }
};

exports.deleteMovie = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find the movie in the database
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Delete movie files from Cloudinary (thumbnail and video)
    if (movie.thumbnail) {
      const publicId = movie.thumbnail.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`movies/thumbnails/${publicId}`);
    }

    if (movie.videoUrl) {
      const publicId = movie.videoUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`movies/videos/${publicId}`);
    }

    // Delete movie from MongoDB
    await movie.deleteOne();

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    next(error);
  }
};
// List Movies
exports.listMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.status(200).json({ movies });
  } catch (error) {
    next(error);
  }
};

// List Movies by Views
exports.listMoviesByViews = async (req, res, next) => {
  try {
    const movies = await Movie.find({}).sort({ viewCount: -1 });
    res.status(200).json({ movies });
  } catch (error) {
    next(error);
  }
};

// List Users
exports.listUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

// Search Users
exports.searchUsers = async (req, res, next) => {
  const { query } = req.query;

  try {
    const users = await User.find({
      email: new RegExp(query, "i"),
      role: "user",
    });
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

// Block User
exports.blockUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User blocked", user });
  } catch (error) {
    next(error);
  }
};

// Unblock User
exports.unblockUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User unblocked", user });
  } catch (error) {
    next(error);
  }
};

// User Watch History
exports.userWatchHistory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate("watchHistory");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ watchHistory: user.watchHistory });
  } catch (error) {
    next(error);
  }
};
