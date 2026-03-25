import { useEffect, useState } from "react";
import "./Trending.css";
import API_URL from "../config";

function Trending({ onSearch }) {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(`${API_URL}/api/trending`);
        
        // Check if the response is ok
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        // Ensure data is an array
        setTrending(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch trending searches:", err);
        setTrending([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrending();
  }, []);

  // Don't show anything while loading or if no trending items
  if (loading) return null;
  if (trending.length === 0) return null;

  return (
    <div className="trending">
      <p className="trending-title">🔥 Trending now</p>
      <div className="trending-chips">
        {trending.map((item, i) => (
          <button
            key={item.query || i}
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