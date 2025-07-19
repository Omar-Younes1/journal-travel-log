const router = require('express').Router();
const jwtAuth = require('../middleware/jwtAuth');
const Entry = require('../models/Entry');

router.get('/', jwtAuth, async (req, res) => {
  const entries = await Entry.find({ user: req.user.id }).sort('-date');
  res.json(entries);
});

router.post('/', jwtAuth, async (req, res) => {
  try {
    const { title, content, date, location, imageUrl } = req.body;
    if (!title || !content)
      return res.status(400).json({ error: 'Missing title or content' });

    const entry = new Entry({
      user: req.user.id,
      title,
      content,
      date: date ? new Date(date) : undefined,
      location,
      imageUrl
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (e) {
    console.error('Create entry error:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', jwtAuth, async (req, res) => {
  const entry = await Entry.findById(req.params.id);
  if (!entry || entry.user.toString() !== req.user.id)
    return res.status(404).json({ error: 'Not found' });
  res.json(entry);
});

router.put('/:id', jwtAuth, async (req, res) => {
  const entry = await Entry.findById(req.params.id);
  if (!entry || entry.user.toString() !== req.user.id)
    return res.status(404).json({ error: 'Not found' });

  const fields = ['title', 'content', 'date', 'location', 'imageUrl'];
  fields.forEach(f => {
    if (req.body[f] !== undefined) {
      entry[f] = f === 'date' ? new Date(req.body[f]) : req.body[f];
    }
  });

  await entry.save();
  res.json(entry);
});

router.delete('/:id', jwtAuth, async (req, res) => {
  const entry = await Entry.findById(req.params.id);
  if (!entry || entry.user.toString() !== req.user.id)
    return res.status(404).json({ error: 'Not found' });

  await entry.deleteOne();
  res.status(204).end();
});

module.exports = router;
