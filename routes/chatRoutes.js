const express = require('express');
const router = express.Router();
const Chat = require('../models/chatModel');
const User = require('../models/userModel');

router.use(express.json());


// Create a chat
router.post('/', async (req, res) => {
  try {
    const participantId = req.body.participantId;
    const user = await User.findById({_id: participantId});
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newChat = new Chat({
      participant: user,
      // Add other properties of the chat here
    });

    const savedChat = await newChat.save();
    console.log(savedChat);
    
    res.status(201).json(savedChat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all chats by participant ID
router.get('/:participantId', async (req, res) => {
  try {
    const chats = await Chat.find({ participant: req.params.participantId });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a chat by ID
router.get('/:id', async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
