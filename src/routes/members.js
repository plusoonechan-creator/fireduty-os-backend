const express = require('express');
const Member = require('../models/Member');

const router = express.Router();

// GET /api/members?team=B班&status=啟用
router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.team) filter.team = req.query.team;
  if (req.query.status) filter.status = req.query.status;
  const members = await Member.find(filter).sort({ memberId: 1 });
  res.json(members);
});

// GET /api/members/:memberId
router.get('/:memberId', async (req, res) => {
  const member = await Member.findOne({ memberId: req.params.memberId });
  if (!member) return res.status(404).json({ error: 'Member not found' });
  res.json(member);
});

// POST /api/members
router.post('/', async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/members/:memberId (upserts, so callers can sync create-or-update in one call)
router.put('/:memberId', async (req, res) => {
  try {
    const payload = Object.assign({}, req.body, { memberId: req.params.memberId });
    const member = await Member.findOneAndUpdate(
      { memberId: req.params.memberId },
      payload,
      { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/members/:memberId
router.delete('/:memberId', async (req, res) => {
  const member = await Member.findOneAndDelete({ memberId: req.params.memberId });
  if (!member) return res.status(404).json({ error: 'Member not found' });
  res.status(204).end();
});

module.exports = router;
