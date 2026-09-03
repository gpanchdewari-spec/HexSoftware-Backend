import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
export async function protect(req, res, next) {
  try {
    const h = req.headers.authorization;
    if (!h?.startsWith("Bearer "))
      return res.status(401).json({ message: "Not authorized" });
    const d = jwt.verify(h.split(" ")[1], process.env.JWT_SECRET);
    req.admin = await Admin.findById(d.id).select("-password");
    if (!req.admin) return res.status(401).json({ message: "Admin not found" });
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
