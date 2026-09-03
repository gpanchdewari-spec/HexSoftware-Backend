import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    features: [String],
    technologies: [String],
  },
  { timestamps: true },
);
export default mongoose.model("Service", schema);
