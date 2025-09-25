require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const searchRouter = require('./routes/search');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per IP per minute
  message: { error: 'Too many requests, please try again later.' }
});
app.use(limiter);

// Routes
app.use('/api/search', searchRouter);

app.get('/', (req, res) => res.json({ ok: true, message: 'LinkedIn Candidate Finder backend' }));

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
