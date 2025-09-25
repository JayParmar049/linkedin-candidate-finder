const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.GOOGLE_API_KEY;
const CX = process.env.GOOGLE_CX;

/**
 * Calls Google Custom Search API
 * @param {string} q - Search query
 * @param {number} start - 1-based index
 * @param {number} num - number of results (<=10)
 */
async function callGoogleCSE(q, start = 1, num = 10) {
  if (!API_KEY || !CX) {
    throw new Error("Missing GOOGLE_API_KEY or GOOGLE_CX in .env");
  }

  const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
    params: {
      key: API_KEY,
      cx: CX,
      q,
      start,
      num
    }
  });

  return response.data;
}

module.exports = { callGoogleCSE };
