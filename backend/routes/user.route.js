import express from "express";
import {
  assignVerifiedOrganizerStatus,
  banUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

//no auth required
router.post("/register", registerUser);
router.post("/login", loginUser);

//auth required
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

//admin specific routes

router.get("/", protect, admin, getAllUsers);
router.get("/:id", protect, admin, getUserById);
router.put("/:id/ban", protect, admin, banUser);
router.put("/:id/verify", protect, admin, assignVerifiedOrganizerStatus);

export default router;
