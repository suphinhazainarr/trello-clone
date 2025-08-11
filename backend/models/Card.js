const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  labels: [{ type: String }],
  dueDate: { type: Date },
  position: { type: Number, default: 0 }
}, { timestamps: true });

// Optimize queries and reordering by list and position
CardSchema.index({ listId: 1, position: 1 });

module.exports = mongoose.model('Card', CardSchema);
