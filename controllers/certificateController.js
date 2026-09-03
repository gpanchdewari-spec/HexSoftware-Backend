import Certificate from "../models/Certificate.js";
export async function list(req, res) {
  res.json(await Certificate.find().sort({ createdAt: -1 }));
}
export async function getOne(req, res) {
  const item = await Certificate.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Certificate not found" });
  res.json(item);
}
export async function create(req, res) {
  const item = await Certificate.create(req.body);
  res.status(201).json(item);
}
export async function update(req, res) {
  const item = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) return res.status(404).json({ message: "Certificate not found" });
  res.json(item);
}
export async function remove(req, res) {
  const item = await Certificate.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Certificate not found" });
  res.json({ message: "Deleted" });
}

export async function verify(req, res) {
  const item = await Certificate.findOne({
    certificateId: req.params.certificateId,
    status: "verified",
  });
  if (!item) return res.status(404).json({ message: "Certificate Not Found" });
  res.json(item);
}
