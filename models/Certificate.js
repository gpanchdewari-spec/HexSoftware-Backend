import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    certificateId: { type: String, required: true, unique: true, index: true },
    studentName: { type: String, required: true },
    domain: String,
    duration: String,
    issueDate: Date,
    certificateUrl: String,
    status: {
      type: String,
      enum: ["verified", "revoked", "expired"],
      default: "verified",
    },
  },
  { timestamps: true },
);
export default mongoose.model("Certificate", schema);
