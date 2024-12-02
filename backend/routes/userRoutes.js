const express = require("express");
const {
  listMovies,
  watchMovie,
  addToWatchlist,
  removeFromWatchlist,
  userWatchHistory,
  watchLists,
} = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);

router.get("/movies", listMovies);
router.get("/movies/:id/watch", watchMovie);
router.post("/movies/:id/watchlist", addToWatchlist);
router.delete("/movies/:id/watchlist", removeFromWatchlist);
router.get("/history", userWatchHistory);
router.get("/watchlists", watchLists);

module.exports = router;
