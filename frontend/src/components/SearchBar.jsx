import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const [country, setCountry] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Combine filters into query
    let searchQuery = input;
    if (country) searchQuery += ` ${country}`;
    if (experience) searchQuery += ` "${experience}"`;
    if (skills) searchQuery += ` ${skills}`;
    onSearch(searchQuery.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder='Search keyword (e.g. "python developer")'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="">All countries</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
        <option value="UK">UK</option>
      </select>

      <select value={experience} onChange={(e) => setExperience(e.target.value)}>
        <option value="">All experience</option>
        <option value="0-1 years">0-1 years</option>
        <option value="2-5 years">2-5 years</option>
        <option value="5+ years">5+ years</option>
      </select>

      <input
        type="text"
        placeholder="Skills (e.g. React, Python)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}
