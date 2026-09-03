import Internship from '../models/Internship.js';
export async function list(req,res){res.json(await Internship.find().sort({createdAt:-1}))}
export async function getOne(req,res){const item=await Internship.findById(req.params.id);if(!item)return res.status(404).json({message:'Internship not found'});res.json(item)}
export async function create(req,res){const item=await Internship.create(req.body);res.status(201).json(item)}
export async function update(req,res){const item=await Internship.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!item)return res.status(404).json({message:'Internship not found'});res.json(item)}
export async function remove(req,res){const item=await Internship.findByIdAndDelete(req.params.id);if(!item)return res.status(404).json({message:'Internship not found'});res.json({message:'Deleted'})}
