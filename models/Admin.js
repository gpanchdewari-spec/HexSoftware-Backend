import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);
export default mongoose.model("Admin", schema);
