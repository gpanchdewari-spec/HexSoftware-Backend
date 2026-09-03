import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: String,
    jobType: String,
    experience: String,
    skills: [String],
    description: String,
    status: { type: String, default: "open" },
  },
  { timestamps: true },
);
export default mongoose.model("Job", schema);
