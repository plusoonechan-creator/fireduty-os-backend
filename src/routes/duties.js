const express = require('express');
const DailyDuty = require('../models/DailyDuty');

const router = express.Router();

// GET /api/duties?team=B班&from=2026-07-01&to=2026-07-31
router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.team) filter.team = req.query.team;
  if (req.query.from || req.query.to) {
    filter.date = {};
    if (req.query.from) filter.date.$gte = new Date(req.query.from);
    if (req.query.to) filter.date.$lte = new Date(req.query.to);
  }
  const duties = await DailyDuty.find(filter).sort({ date: 1 });
  res.json(duties);
});

// GET /api/duties/:id
router.get('/:id', async (req, res) => {
  const duty = await DailyDuty.findById(req.params.id);
  if (!duty) return res.status(404).json({ error: 'Duty record not found' });
  res.json(duty);
});

// POST /api/duties
router.post('/', async (req, res) => {
  try {
    const duty = await DailyDuty.create(req.body);
    res.status(201).json(duty);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/duties/:id
router.put('/:id', async (req, res) => {
  try {
    const duty = await DailyDuty.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!duty) return res.status(404).json({ error: 'Duty record not found' });
    res.json(duty);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/duties/:id
router.delete('/:id', async (req, res) => {
  const duty = await DailyDuty.findByIdAndDelete(req.params.id);
  if (!duty) return res.status(404).json({ error: 'Duty record not found' });
  res.status(204).end();
});

module.exports = router;
