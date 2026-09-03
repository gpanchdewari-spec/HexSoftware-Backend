import Job from "../models/Job.js";
export async function list(req, res) {
  res.json(await Job.find().sort({ createdAt: -1 }));
}
export async function getOne(req, res) {
  const item = await Job.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Job not found" });
  res.json(item);
}
export async function create(req, res) {
  const item = await Job.create(req.body);
  res.status(201).json(item);
}
export async function update(req, res) {
  const item = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) return res.status(404).json({ message: "Job not found" });
  res.json(item);
}
export async function remove(req, res) {
  const item = await Job.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Job not found" });
  res.json({ message: "Deleted" });
}
