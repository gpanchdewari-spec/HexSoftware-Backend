import express from "express";

import {
  list,
  getOne,
  create,
  update,
  remove,
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";
import { imageUpload } from "../middleware/imageUploadMiddleware.js";

const router = express.Router();

router.get("/", list);

router.get("/:id", getOne);

router.post("/", protect, imageUpload.single("image"), create);

router.put("/:id", protect, imageUpload.single("image"), update);

router.delete("/:id", protect, remove);

export default router;
