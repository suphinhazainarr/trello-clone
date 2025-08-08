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

// Update a list (rename, position)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, position } = req.body;
    const list = await List.findById(id);
    if (!list) return res.status(404).json({ message: 'List not found' });
    const board = await Board.findById(list.boardId);
    if (!board) return res.status(404).json({ message: 'Board not found' });
    if (!board.members.some(m => m.user.toString() === req.user.id)) return res.status(403).json({ message: 'Not a board member' });

    if (typeof title === 'string') list.title = title;
    if (typeof position === 'number') list.position = position;

    await list.save();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a list
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const list = await List.findById(id);
    if (!list) return res.status(404).json({ message: 'List not found' });
    const board = await Board.findById(list.boardId);
    if (!board) return res.status(404).json({ message: 'Board not found' });
    if (!board.members.some(m => m.user.toString() === req.user.id)) return res.status(403).json({ message: 'Not a board member' });

    // Remove list from board.lists
    board.lists = board.lists.filter(lid => lid.toString() !== list._id.toString());
    await board.save();

    await List.deleteOne({ _id: id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reorder lists for a board
// Body: { boardId, orderedListIds: [listId in new order] }
router.patch('/reorder', auth, async (req, res) => {
  try {
    const { boardId, orderedListIds } = req.body;
    if (!boardId || !Array.isArray(orderedListIds)) return res.status(400).json({ message: 'boardId and orderedListIds required' });

    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ message: 'Board not found' });
    if (!board.members.some(m => m.user.toString() === req.user.id)) return res.status(403).json({ message: 'Not a board member' });

    // Update positions in bulk
    const bulk = orderedListIds.map((id, idx) => ({ updateOne: { filter: { _id: id }, update: { position: idx } } }));
    await List.bulkWrite(bulk);

    // Optionally sync board.lists order as well
    board.lists = orderedListIds;
    await board.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
