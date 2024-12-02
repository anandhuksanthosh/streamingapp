const express = require("express");
const {
  createMovie,
  updateMovie,
  listMovies,
  listMoviesByViews,
  listUsers,
  searchUsers,
  blockUser,
  unblockUser,
  userWatchHistory,
  deleteMovie,
} = require("../controllers/adminController");
const { authenticate } = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/roleMiddleware");
const { uploadFiles } = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.use(authenticate);
router.use(authorizeRole("admin"));

router.post("/movies", uploadFiles, createMovie);
router.put("/movies/:id", uploadFiles, updateMovie);
router.delete("/movies/:id", deleteMovie);
router.get("/movies", listMovies);
router.get("/movies/sorted", listMoviesByViews);
router.get("/users", listUsers);
router.get("/users/search", searchUsers);
router.put("/users/:id/block", blockUser);
router.put("/users/:id/unblock", unblockUser);
router.get("/users/:id/history", userWatchHistory);

module.exports = router;
