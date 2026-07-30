const express = require('express');
const LeaveRecord = require('../models/LeaveRecord');

const router = express.Router();

// GET /api/leaves?memberId=17&status=待審核
router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.memberId) filter.memberId = req.query.memberId;
  if (req.query.status) filter.status = req.query.status;
  const leaves = await LeaveRecord.find(filter).sort({ startDate: -1 });
  res.json(leaves);
});

// GET /api/leaves/:id
router.get('/:id', async (req, res) => {
  const leave = await LeaveRecord.findById(req.params.id);
  if (!leave) return res.status(404).json({ error: 'Leave record not found' });
  res.json(leave);
});

// POST /api/leaves
router.post('/', async (req, res) => {
  try {
    const leave = await LeaveRecord.create(req.body);
    res.status(201).json(leave);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/leaves/:id
router.put('/:id', async (req, res) => {
  try {
    const leave = await LeaveRecord.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!leave) return res.status(404).json({ error: 'Leave record not found' });
    res.json(leave);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/leaves/:id
router.delete('/:id', async (req, res) => {
  const leave = await LeaveRecord.findByIdAndDelete(req.params.id);
  if (!leave) return res.status(404).json({ error: 'Leave record not found' });
  res.status(204).end();
});

module.exports = router;
