const express = require('express');
const router = express.Router();
const { callGoogleCSE } = require('../utils/googleClient');

// Config
const RESULTS_PER_PAGE = parseInt(process.env.RESULTS_PER_PAGE || '20', 10);
const MAX_RESULTS = parseInt(process.env.MAX_RESULTS || '100', 10);

/**
 * GET /api/search?q=python+developer+bangalore&page=1
 * Returns JSON: { totalResults, page, perPage, results: [ { title, link, snippet } ] }
 */
router.get('/', async (req, res) => {
  const q = req.query.q;
  let page = parseInt(req.query.page || '1', 10);

  if (!q || q.trim().length === 0) {
    return res.status(400).json({ error: 'Missing search query `q`' });
  }
  if (page < 1) page = 1;

  // Calculate zero-based offset
  const perPage = RESULTS_PER_PAGE;
  const startIndex = (page - 1) * perPage;
  if (startIndex >= MAX_RESULTS) {
    return res.status(400).json({ error: `Page exceeds max results (${MAX_RESULTS})` });
  }

  try {
    const results = [];
    const numPerCall = 10; // Google API limit
    const calls = Math.ceil(perPage / numPerCall);
    let total;

    for (let i = 0; i < calls; i++) {
      const callStart = startIndex + i * numPerCall + 1; // 1-based index
      const callNum = Math.min(numPerCall, perPage - i * numPerCall);
      const data = await callGoogleCSE(q, callStart, callNum);

      const items = (data.items || []).map(it => ({
        title: it.title,
        link: it.link,
        snippet: it.snippet,
        displayLink: it.displayLink
      }));
      results.push(...items);

      if (i === 0) {
        total = parseInt(data.searchInformation?.totalResults || '0', 10);
      }

      if (!data.items || data.items.length < callNum) break;
    }
    
    if (req.query.country) {
      items = items.filter(it =>
        it.snippet.toLowerCase().includes(req.query.country.toLowerCase()) ||
        it.title.toLowerCase().includes(req.query.country.toLowerCase())
      );
    }

    if (req.query.experience) {
      items = items.filter(it =>
        it.snippet.toLowerCase().includes(req.query.experience.toLowerCase())
      );
    }

    if (req.query.skills) {
      const skillsArr = req.query.skills.split(",").map(s => s.trim().toLowerCase());
      items = items.filter(it =>
        skillsArr.some(skill => it.snippet.toLowerCase().includes(skill))
      );
    }


    return res.json({
      totalResults: total || results.length,
      page,
      perPage,
      results
    });
  } catch (err) {
    console.error('Search error:', err.message || err);
    return res.status(500).json({ error: 'Search failed', details: err.message || err });
  }
});

module.exports = router;
