import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        className="searchbar-input"
        type="text"
        placeholder="Try 'Stanley Cup' or 'Lululemon bag'..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="searchbar-btn" type="submit">Find Dupes ✨</button>
    </form>
  );
}

export default SearchBar;