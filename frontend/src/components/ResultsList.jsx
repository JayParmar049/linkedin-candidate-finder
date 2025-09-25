import React from 'react';

export default function ResultsList({ results }) {
  if (!results.length) return null;

  return (
    <div className="results-list">
      {results.map((r, i) => (
        <div key={i} className="result-card">
          <a href={r.link} target="_blank" rel="noreferrer">
            <h3>{r.title}</h3>
          </a>
          <p>{r.snippet}</p>
          <small>{r.displayLink}</small>
        </div>
      ))}
    </div>
  );
}
