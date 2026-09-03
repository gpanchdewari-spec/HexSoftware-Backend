import Service from "../models/Service.js";
export async function list(req, res) {
  res.json(await Service.find().sort({ createdAt: -1 }));
}
export async function getOne(req, res) {
  const item = await Service.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Service not found" });
  res.json(item);
}
export async function create(req, res) {
  const item = await Service.create(req.body);
  res.status(201).json(item);
}
export async function update(req, res) {
  const item = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) return res.status(404).json({ message: "Service not found" });
  res.json(item);
}
export async function remove(req, res) {
  const item = await Service.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Service not found" });
  res.json({ message: "Deleted" });
}
