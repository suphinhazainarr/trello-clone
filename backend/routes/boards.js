const express = require('express');
const Board = require('../models/Board');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a board
router.post('/', auth, async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const board = new Board({
      title,
      ownerId: req.user.id,
      members: [req.user.id]
    });
    await board.save();
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all boards for user
router.get('/boards', auth, async (req, res) => {
  try {
    const boards = await Board.find({
      members: req.user.id
    }).sort({ createdAt: -1 }); // Most recent first
    res.json(boards);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
