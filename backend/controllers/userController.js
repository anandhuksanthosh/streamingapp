const Movie = require("../models/Movie");
const User = require("../models/User");

// List Movies
exports.listMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.status(200).json({ movies });
  } catch (error) {
    next(error);
  }
};

// Watch Movie
exports.watchMovie = async (req, res, next) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    );
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const user = await User.findById(req.user._id);
    user.watchHistory.push(movie._id);
    await user.save();

    res.status(200).json({ message: "Movie watched", movie });
  } catch (error) {
    next(error);
  }
};

// Add to Watchlist
exports.addToWatchlist = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(req.user._id);
    if (user.watchlist.includes(id))
      return res.status(400).json({ message: "Already in watchlist" });

    user.watchlist.push(id);
    await user.save();

    res.status(200).json({ message: "Added to watchlist" });
  } catch (error) {
    next(error);
  }
};

// Remove from Watchlist
exports.removeFromWatchlist = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(req.user._id);
    user.watchlist = user.watchlist.filter(
      (movieId) => movieId.toString() !== id
    );
    await user.save();

    res.status(200).json({ message: "Removed from watchlist" });
  } catch (error) {
    next(error);
  }
};

// User Watch History
exports.userWatchHistory = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("watchHistory");
    res.status(200).json({ watchHistory: user.watchHistory });
  } catch (error) {
    next(error);
  }
};

exports.watchLists = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ watchlists: user.watchlist });
  } catch (error) {
    next(error);
  }
};
