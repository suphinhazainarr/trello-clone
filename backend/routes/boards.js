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
// Get all boards for user
router.get('/', auth, async (req, res) => {
  try {
    // Find boards where the user's ID is in the 'user' field of the members array
    const boards = await Board.find({
      'members.user': req.user.id  // <-- CORRECTED QUERY
    }).sort({ createdAt: -1 });

    res.json(boards);
  } catch (err) {
    console.error("Error fetching boards:", err); // Add console.error for better debugging
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
