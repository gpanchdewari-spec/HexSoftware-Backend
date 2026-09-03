import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    company: String,
    service: String,
    budget: String,
    message: String,
    status: { type: String, default: "new" },
  },
  { timestamps: true },
);
export default mongoose.model("Contact", schema);
