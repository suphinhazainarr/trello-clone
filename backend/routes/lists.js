const express = require('express');
const List = require('../models/List');
const Board = require('../models/Board');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a list
router.post('/', auth, async (req, res) => {
  try {
    const { boardId, title, position } = req.body;
    if (!boardId || !title) return res.status(400).json({ message: 'boardId and title are required' });
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: 'Board not found' });
    if (!board.members.some(m => m.user.toString() === req.user.id)) return res.status(403).json({ message: 'Not a board member' });
    const list = new List({ boardId, title, position });
    await list.save();
    board.lists.push(list._id);
    await board.save();
    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
