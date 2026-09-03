import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

const uploadProjectImage = async (file) => {
  if (!file) return null;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "hexsoftwares/projects",
        resource_type: "image",

        // Cloudinary ko response ke liye 2 minutes do
        timeout: 120000,
      },
      (error, result) => {
        if (error) {
          console.log("PROJECT IMAGE UPLOAD ERROR:", error);

          reject(error);
          return;
        }

        console.log("PROJECT IMAGE UPLOADED:", result.secure_url);

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    stream.on("error", (error) => {
      console.log("CLOUDINARY STREAM ERROR:", error);

      reject(error);
    });

    stream.end(file.buffer);
  });
};

const parseStack = (stack) => {
  if (!stack) return [];

  if (Array.isArray(stack)) {
    return stack;
  }

  try {
    const parsed = JSON.parse(stack);

    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // comma separated string
  }

  return String(stack)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

export async function list(req, res) {
  try {
    const projects = await Project.find().sort({
      createdAt: -1,
    });

    res.json(projects);
  } catch (error) {
    console.log("GET PROJECTS ERROR:", error);

    res.status(500).json({
      message: "Could not load projects",
    });
  }
}

export async function getOne(req, res) {
  try {
    const item = await Project.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(item);
  } catch (error) {
    console.log("GET PROJECT ERROR:", error);

    res.status(500).json({
      message: "Could not load project",
    });
  }
}

export async function create(req, res) {
  try {
    const { title, category, description, stack, results } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    let image = "";
    let imagePublicId = "";

    if (req.file) {
      const uploadedImage = await uploadProjectImage(req.file);

      image = uploadedImage.url;
      imagePublicId = uploadedImage.publicId;
    }

    const item = await Project.create({
      title,
      category: category || "Web",
      description,
      stack: parseStack(stack),
      results: results || "",
      image,
      imagePublicId,
    });

    res.status(201).json(item);
  } catch (error) {
    console.log("CREATE PROJECT ERROR:", error);

    res.status(500).json({
      message: "Could not create project",
    });
  }
}

export async function update(req, res) {
  try {
    const item = await Project.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const { title, category, description, stack, results } = req.body;

    if (title !== undefined) {
      item.title = title;
    }

    if (category !== undefined) {
      item.category = category;
    }

    if (description !== undefined) {
      item.description = description;
    }

    if (stack !== undefined) {
      item.stack = parseStack(stack);
    }

    if (results !== undefined) {
      item.results = results;
    }

    if (req.file) {
      if (item.imagePublicId) {
        try {
          await cloudinary.uploader.destroy(item.imagePublicId);
        } catch (error) {
          console.log("OLD IMAGE DELETE ERROR:", error.message);
        }
      }

      const uploadedImage = await uploadProjectImage(req.file);

      item.image = uploadedImage.url;
      item.imagePublicId = uploadedImage.publicId;
    }

    await item.save();

    res.json(item);
  } catch (error) {
    console.log("UPDATE PROJECT ERROR:", error);

    res.status(500).json({
      message: "Could not update project",
    });
  }
}

export async function remove(req, res) {
  try {
    const item = await Project.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (item.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(item.imagePublicId);
      } catch (error) {
        console.log("PROJECT IMAGE DELETE ERROR:", error.message);
      }
    }

    await item.deleteOne();

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    console.log("DELETE PROJECT ERROR:", error);

    res.status(500).json({
      message: "Could not delete project",
    });
  }
}
