import express from "express";

import {
  createJobApplication,
  getJobApplications,
  updateJobApplication,
  deleteJobApplication,
} from "../controllers/jobApplicationController.js";

import { protect } from "../middleware/authMiddleware.js";

import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", upload.single("resume"), createJobApplication);

router.get("/", protect, getJobApplications);

router.put("/:id", protect, updateJobApplication);

router.delete("/:id", protect, deleteJobApplication);

export default router;
