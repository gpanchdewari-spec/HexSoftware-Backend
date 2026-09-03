import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phone: String,
    college: String,
    course: String,
    graduationYear: String,
    internship: { type: mongoose.Schema.Types.ObjectId, ref: "Internship" },
    duration: String,
    skills: String,
    github: String,
    linkedin: String,
    resumeUrl: String,
    message: String,
    status: {
      type: String,

      enum: ["pending", "shortlisted", "selected", "rejected"],

      default: "pending",
    },
  },
  { timestamps: true },
);
export default mongoose.model("Application", schema);
