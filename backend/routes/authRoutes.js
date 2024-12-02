const express = require("express");
const {
  signup,
  login,
  resetPassword,
  logout,
} = require("../controllers/authController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/reset-password", authenticate, resetPassword);
router.post("/logout", logout);

module.exports = router;
