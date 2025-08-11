const express = require('express');
const Board = require('../models/Board');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a board
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, background, visibility, workspace } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const board = new Board({
      title,
      description,
      background: background || "#0079bf",
      visibility: visibility || "private",
      ownerId: req.user.id,
      members: [{
        user: req.user.id,
        role: "admin"
      }],
      workspace: workspace || undefined // if you have workspaces
    });
    await board.save();
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all boards for user
router.get('/', auth, async (req, res) => {
  try {
    const boards = await Board.find({
      'members.user': req.user.id
    }).sort({ createdAt: -1 });
    
    res.json(boards);
  } catch (err) {
    console.error('Error fetching boards:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single board by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const board = await Board.findOne({
      _id: req.params.id,
      'members.user': req.user.id // Ensure user is a member
    })
    .populate({
      path: 'lists',
      populate: { path: 'cards' }
    });

    if (!board) {
      return res.status(404).json({ message: 'Board not found or you do not have access' });
    }
    res.json(board);
  } catch (err) {
    console.error("Error fetching board by ID:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
