const mongoose = require('mongoose');


const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  background: { type: String, default: "#0079bf" },
  visibility: { type: String, enum: ["private", "public", "workspace"], default: "private" },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ["admin", "editor", "viewer"], default: "editor" }
  }],
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
  starredBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  archived: { type: Boolean, default: false }
});