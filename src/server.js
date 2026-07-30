require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const membersRouter = require('./routes/members');
const dutiesRouter = require('./routes/duties');
const leavesRouter = require('./routes/leaves');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));
app.use('/api/members', membersRouter);
app.use('/api/duties', dutiesRouter);
app.use('/api/leaves', leavesRouter);

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => console.log(`FireDutyOS backend listening on port ${port}`));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
