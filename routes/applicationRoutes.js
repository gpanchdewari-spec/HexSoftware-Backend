import express from "express";

import {
  list,
  getOne,
  create,
  update,
  remove,
  getMyApplications,
} from "../controllers/applicationController.js";

import { protect } from "../middleware/authMiddleware.js";
import { protectUser } from "../middleware/userAuthMiddleware.js";

import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ===============================
// USER ROUTES
// ===============================

// Logged-in user apni applications dekhega
router.get("/mine", protectUser, getMyApplications);

// Logged-in user internship apply karega
router.post("/", protectUser, upload.single("resume"), create);

// ===============================
// ADMIN ROUTES
// ===============================

// Admin all applications
router.get("/", protect, list);

// Admin single application
router.get("/:id", protect, getOne);

// Admin update application/status
router.put("/:id", protect, update);

// Admin delete application
router.delete("/:id", protect, remove);

export default router;
