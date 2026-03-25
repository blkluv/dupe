import { useEffect, useState } from "react";
import API_URL from "../config";
import "./Trending.css";

function Trending({ onSearch }) {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(`${API_URL}/api/trending`);
        
        // Check if response is ok
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          setTrending(data);
        } else {
          console.error("Unexpected data format:", data);
          setTrending([]);
        }
      } catch (err) {
        console.error("Failed to fetch trending searches:", err);
        setError(err.message);
        setTrending([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrending();
  }, []);

  // Don't show anything while loading
  if (loading) return null;
  
  // Don't show anything if there's an error or no trending items
  if (error) return null;
  if (trending.length === 0) return null;

  // Format the query for display (capitalize first letter of each word)
  const formatQuery = (query) => {
    return query
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

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
            {formatQuery(item.query)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Trending;