import { useEffect, useState } from "react";
import API_URL from "../config";
import "./Trending.css";

function Trending({ onSearch }) {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(`${API_URL}/api/trending`);
        const data = await res.json();
        setTrending(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrending();
  }, []);

  if (trending.length === 0) return null;

  return (
    <div className="trending">
      <p className="trending-title">🔥 Trending now</p>
      <div className="trending-chips">
        {trending.map((item, i) => (
          <button
            key={item.query}
            className="trending-chip"
            onClick={() => onSearch(item.query)}
          >
            <span className="trending-rank">#{i + 1}</span>
            {item.query}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Trending;