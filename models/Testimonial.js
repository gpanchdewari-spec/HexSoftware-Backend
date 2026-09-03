import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    position: String,
    company: String,
    image: String,
    message: { type: String, required: true },
    rating: { type: Number, default: 5 },
  },
  { timestamps: true },
);
export default mongoose.model("Testimonial", schema);
