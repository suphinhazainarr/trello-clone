const express = require('express');
const Card = require('../models/Card');
const List = require('../models/List');
const Board = require('../models/Board');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a card
router.post('/', auth, async (req, res) => {
  try {
    const { listId, title, description, assignedTo, labels, dueDate, position } = req.body;
    if (!listId || !title) return res.status(400).json({ message: 'listId and title are required' });
    const list = await List.findById(listId);
    if (!list) return res.status(404).json({ message: 'List not found' });
    const board = await Board.findById(list.boardId);
    if (!board.members.includes(req.user.id)) return res.status(403).json({ message: 'Not a board member' });
    const card = new Card({ listId, title, description, assignedTo, labels, dueDate, position });
    await card.save();
    list.cards.push(card._id);
    await list.save();
    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
