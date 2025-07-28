const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
  title: { type: String, required: true },
  description: { type: String },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  labels: [{ type: String }],
  dueDate: { type: Date },
  position: { type: Number, default: 0 }
});

module.exports = mongoose.model('Card', CardSchema);
