const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  title: { type: String, required: true },
  position: { type: Number, default: 0 },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }]
}, { timestamps: true });

// Optimize queries and reordering by board and position
ListSchema.index({ boardId: 1, position: 1 });

module.exports = mongoose.model('List', ListSchema);
