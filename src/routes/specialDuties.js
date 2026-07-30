const express = require('express');
const SpecialDutyAction = require('../models/SpecialDutyAction');

const router = express.Router();

// GET /api/special-duties?team=B班&date=2026-08-10&month=2026-08&userId=17&mode=請假
router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.team) filter.team = req.query.team;
  if (req.query.userId) filter.userId = req.query.userId;
  if (req.query.mode) filter.mode = req.query.mode;
  if (req.query.date) filter.date = req.query.date;
  else if (req.query.month) filter.date = { $regex: '^' + req.query.month };
  const actions = await SpecialDutyAction.find(filter).sort({ date: 1 });
  res.json(actions);
});

// GET /api/special-duties/:id
router.get('/:id', async (req, res) => {
  const action = await SpecialDutyAction.findById(req.params.id);
  if (!action) return res.status(404).json({ error: 'Special duty action not found' });
  res.json(action);
});

// POST /api/special-duties
router.post('/', async (req, res) => {
  try {
    const action = await SpecialDutyAction.create(req.body);
    res.status(201).json(action);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/special-duties/:id
router.put('/:id', async (req, res) => {
  try {
    const action = await SpecialDutyAction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!action) return res.status(404).json({ error: 'Special duty action not found' });
    res.json(action);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/special-duties/:id
router.delete('/:id', async (req, res) => {
  const action = await SpecialDutyAction.findByIdAndDelete(req.params.id);
  if (!action) return res.status(404).json({ error: 'Special duty action not found' });
  res.status(204).end();
});

module.exports = router;
