import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';

const API_BASE = "http://localhost:5000/api/search";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchResults = async (q, p = 1) => {
    if (!q) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(API_BASE, { params: { q, page: p } });
      setResults(res.data.results || []);
      setPage(res.data.page);
      setTotal(res.data.totalResults);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (q) => {
    setQuery(q);
    fetchResults(q, 1);
  };

  const handlePage = (nextPage) => {
    fetchResults(query, nextPage);
  };

  return (
    <div className="app-container">
      <h1>LinkedIn Candidate Finder</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <ResultsList results={results} />
      {results.length > 0 && (
        <div className="pagination">
          <button disabled={page <= 1} onClick={() => handlePage(page - 1)}>Prev</button>
          <span> Page {page} </span>
          <button disabled={page * 20 >= total} onClick={() => handlePage(page + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}
