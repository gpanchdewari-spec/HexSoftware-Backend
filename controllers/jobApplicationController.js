import JobApplication from "../models/JobApplication.js";
import Job from "../models/Job.js";
import cloudinary from "../config/cloudinary.js";

async function uploadResume(file) {
  if (!file) return "";

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "hexsoftwares/job-resumes",
        resource_type: "raw",
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      },
    );

    stream.end(file.buffer);
  });
}

export async function createJobApplication(req, res) {
  try {
    const {
      job,
      name,
      email,
      phone,
      experience,
      currentCompany,
      skills,
      github,
      linkedin,
      coverLetter,
    } = req.body;

    if (!job || !name || !email || !phone) {
      return res.status(400).json({
        message: "Job, name, email and phone are required",
      });
    }

    const jobExists = await Job.findById(job);

    if (!jobExists) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const resumeUrl = await uploadResume(req.file);

    const application = await JobApplication.create({
      job,
      name,
      email,
      phone,
      experience,
      currentCompany,
      skills,
      github,
      linkedin,
      coverLetter,
      resumeUrl,
      status: "pending",
    });

    res.status(201).json({
      message: "Job application submitted successfully",
      application,
    });
  } catch (error) {
    console.log("JOB APPLICATION ERROR:", error);

    res.status(500).json({
      message: "Could not submit job application",
    });
  }
}

export async function getJobApplications(req, res) {
  try {
    const applications = await JobApplication.find()
      .populate("job", "title location jobType experience")
      .sort({
        createdAt: -1,
      });

    res.json(applications);
  } catch (error) {
    console.log("GET JOB APPLICATIONS ERROR:", error);

    res.status(500).json({
      message: "Could not load job applications",
    });
  }
}

export async function updateJobApplication(req, res) {
  try {
    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    ).populate("job", "title location jobType");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json(application);
  } catch (error) {
    res.status(500).json({
      message: "Could not update application",
    });
  }
}

export async function deleteJobApplication(req, res) {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json({
      message: "Application deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not delete application",
    });
  }
}
