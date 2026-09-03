import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    domain: String,
    duration: String,
    mode: String,
    description: String,
    skills: [String],
    status: { type: String, default: "open" },
  },
  { timestamps: true },
);
export default mongoose.model("Internship", schema);
