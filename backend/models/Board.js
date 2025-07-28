const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Board', BoardSchema);
