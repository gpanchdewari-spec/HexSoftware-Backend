import Application from "../models/Application.js";
import cloudinary from "../config/cloudinary.js";

async function uploadBuffer(file) {
  if (!file) return "";

  if (!process.env.CLOUDINARY_CLOUD_NAME) return "";

  return await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "hexsoftwares/resumes",
        resource_type: "raw",
      },
      (err, result) => (err ? reject(err) : resolve(result.secure_url)),
    );

    stream.end(file.buffer);
  });
}

// ===============================
// ADMIN - GET ALL APPLICATIONS
// ===============================

export async function list(req, res) {
  try {
    const applications = await Application.find()
      .populate("internship", "title")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error("LIST APPLICATIONS ERROR:", error);

    res.status(500).json({
      message: "Could not load applications",
    });
  }
}

// ===============================
// ADMIN - GET SINGLE APPLICATION
// ===============================

export async function getOne(req, res) {
  try {
    const item = await Application.findById(req.params.id)
      .populate("internship", "title duration mode")
      .populate("user", "name email");

    if (!item) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json(item);
  } catch (error) {
    console.error("GET APPLICATION ERROR:", error);

    res.status(500).json({
      message: "Could not load application",
    });
  }
}

// ===============================
// USER - CREATE APPLICATION
// ===============================

export async function create(req, res) {
  try {
    const resumeUrl = await uploadBuffer(req.file);

    const item = await Application.create({
      ...req.body,

      // logged-in user
      user: req.user._id,

      resumeUrl,

      status: "pending",
    });

    res.status(201).json(item);
  } catch (error) {
    console.error("CREATE APPLICATION ERROR:", error);

    res.status(500).json({
      message: "Could not submit application",
    });
  }
}

// ===============================
// USER - GET MY APPLICATIONS
// ===============================

export async function getMyApplications(req, res) {
  try {
    const applications = await Application.find({
      user: req.user._id,
    })
      .populate("internship", "title duration mode description")
      .sort({
        createdAt: -1,
      });

    res.status(200).json(applications);
  } catch (error) {
    console.error("GET MY APPLICATIONS ERROR:", error);

    res.status(500).json({
      message: "Could not load applications",
    });
  }
}

// ===============================
// ADMIN - UPDATE APPLICATION
// ===============================

export async function update(req, res) {
  try {
    const item = await Application.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json(item);
  } catch (error) {
    console.error("UPDATE APPLICATION ERROR:", error);

    res.status(500).json({
      message: "Could not update application",
    });
  }
}

// ===============================
// ADMIN - DELETE APPLICATION
// ===============================

export async function remove(req, res) {
  try {
    const item = await Application.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    console.error("DELETE APPLICATION ERROR:", error);

    res.status(500).json({
      message: "Could not delete application",
    });
  }
}
