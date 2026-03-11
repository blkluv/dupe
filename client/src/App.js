import { useState } from "react";
import SearchBar from "./components/SearchBar";
import DupeCard from "./components/DupeCard";
import dupes from "./data";
import "./App.css";

function App() {
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (query) => {
    const filtered = dupes.filter(dupe =>
      dupe.query.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setSearched(true);
  };

  return (
    <div className="app">
      <header className="hero">
        <p className="tagline">✨ luxury looks, budget prices</p>
        <h1 className="title">Dupe Finder</h1>
        <p className="subtitle">Search any luxury item and find affordable alternatives you'll actually love</p>
        <SearchBar onSearch={handleSearch} />
      </header>

      <main className="results-section">
        {searched && results.length === 0 && (
          <p className="no-results">No dupes found yet — we're always adding more! 🛍️</p>
        )}
        <div className="results-grid">
          {results.map(dupe => (
            <DupeCard key={dupe.id} {...dupe} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;