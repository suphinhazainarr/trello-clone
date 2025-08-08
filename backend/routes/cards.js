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
    if (!board.members.some(m => m.user.toString() === req.user.id)) return res.status(403).json({ message: 'Not a board member' });
    const card = new Card({ listId, title, description, assignedTo, labels, dueDate, position });
    await card.save();
    list.cards.push(card._id);
    await list.save();
    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a card (title, description, labels, dueDate, assignedTo, position)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, labels, dueDate, assignedTo, position } = req.body;

    const card = await Card.findById(id);
    if (!card) return res.status(404).json({ message: 'Card not found' });

    const list = await List.findById(card.listId);
    if (!list) return res.status(404).json({ message: 'List not found' });

    const board = await Board.findById(list.boardId);
    if (!board) return res.status(404).json({ message: 'Board not found' });
    if (!board.members.some(m => m.user.toString() === req.user.id)) return res.status(403).json({ message: 'Not a board member' });

    if (typeof title === 'string') card.title = title;
    if (typeof description === 'string' || description === null) card.description = description;
    if (Array.isArray(labels)) card.labels = labels;
    if (Array.isArray(assignedTo)) card.assignedTo = assignedTo;
    if (dueDate === null || typeof dueDate === 'string' || dueDate instanceof Date) card.dueDate = dueDate;
    if (typeof position === 'number') card.position = position;

    await card.save();
    res.json(card);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a card
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card) return res.status(404).json({ message: 'Card not found' });

    const list = await List.findById(card.listId);
    if (!list) return res.status(404).json({ message: 'List not found' });

    const board = await Board.findById(list.boardId);
    if (!board) return res.status(404).json({ message: 'Board not found' });
    if (!board.members.some(m => m.user.toString() === req.user.id)) return res.status(403).json({ message: 'Not a board member' });

    // Remove card from list.cards
    list.cards = list.cards.filter(cid => cid.toString() !== card._id.toString());
    await list.save();

    await Card.deleteOne({ _id: id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reorder / Move cards across lists
// Body: { sourceListId, destinationListId, orderedCardIdsInSource, orderedCardIdsInDestination }
router.patch('/reorder', auth, async (req, res) => {
  try {
    const { sourceListId, destinationListId, orderedCardIdsInSource, orderedCardIdsInDestination } = req.body;

    if (!sourceListId || !Array.isArray(orderedCardIdsInSource)) {
      return res.status(400).json({ message: 'sourceListId and orderedCardIdsInSource required' });
    }

    const sourceList = await List.findById(sourceListId);
    if (!sourceList) return res.status(404).json({ message: 'Source list not found' });

    const sourceBoard = await Board.findById(sourceList.boardId);
    if (!sourceBoard || !sourceBoard.members.some(m => m.user.toString() === req.user.id)) {
      return res.status(403).json({ message: 'Not a board member' });
    }

    // If moving to another list
    if (destinationListId && destinationListId !== sourceListId) {
      const destList = await List.findById(destinationListId);
      if (!destList) return res.status(404).json({ message: 'Destination list not found' });

      const destBoard = await Board.findById(destList.boardId);
      if (!destBoard || destBoard._id.toString() !== sourceBoard._id.toString()) {
        return res.status(400).json({ message: 'Lists belong to different boards' });
      }

      // Update positions in both lists
      const bulkOps = [];
      orderedCardIdsInSource.forEach((id, idx) => bulkOps.push({ updateOne: { filter: { _id: id }, update: { listId: sourceListId, position: idx } } }));
      (orderedCardIdsInDestination || []).forEach((id, idx) => bulkOps.push({ updateOne: { filter: { _id: id }, update: { listId: destinationListId, position: idx } } }));
      await Card.bulkWrite(bulkOps);

      // Sync list.cards arrays
      sourceList.cards = orderedCardIdsInSource;
      destList.cards = orderedCardIdsInDestination || destList.cards;
      await sourceList.save();
      await destList.save();
    } else {
      // Reorder within same list
      const bulkOps = orderedCardIdsInSource.map((id, idx) => ({ updateOne: { filter: { _id: id }, update: { position: idx } } }));
      await Card.bulkWrite(bulkOps);
      sourceList.cards = orderedCardIdsInSource;
      await sourceList.save();
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
