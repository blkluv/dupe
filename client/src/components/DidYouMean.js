import Fuse from "fuse.js";
import SEARCH_TERMS from "../data/searchTerms";
import "./DidYouMean.css";

const fuse = new Fuse(SEARCH_TERMS, {
  threshold: 0.4,
  distance: 100,
  minMatchCharLength: 3
});

function DidYouMean({ query, onSearch }) {
  if (!query) return null;

  const results = fuse.search(query);
  const topMatch = results[0]?.item;

  if (!topMatch || topMatch.toLowerCase() === query.toLowerCase()) return null;

  return (
    <div className="did-you-mean">
      <span className="dym-text">Did you mean </span>
      <button className="dym-suggestion" onClick={() => onSearch(topMatch)}>
        <em>{topMatch}</em>
      </button>
      <span className="dym-text">?</span>
    </div>
  );
}

export default DidYouMean;