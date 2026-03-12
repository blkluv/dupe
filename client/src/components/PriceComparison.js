import { useState } from "react";
import "./PriceComparison.css";

function PriceComparison({ query, originalPrice, dupePrice }) {
  const [hidden, setHidden] = useState(false);

  if (!originalPrice || !dupePrice) return null;

  const savings = (originalPrice - dupePrice).toFixed(2);
  const savingsPct = Math.round((savings / originalPrice) * 100);
  const dupeWidth = Math.round((dupePrice / originalPrice) * 100);

  if (hidden) {
    return (
      <div className="pc-collapsed" onClick={() => setHidden(false)}>
        <span className="pc-collapsed-text">💸 You save ${savings} ({savingsPct}% off)</span>
        <span className="pc-collapsed-btn">Show ▾</span>
      </div>
    );
  }

  return (
    <div className="price-comparison">
      <div className="pc-header">
        <h3 className="pc-title">💸 See how much you save</h3>
        <div className="pc-header-right">
          <span className="pc-savings">Save ${savings} ({savingsPct}% off)</span>
          <button className="pc-toggle" onClick={() => setHidden(true)}>
            Hide ▴
          </button>
        </div>
      </div>

      <div className="pc-bars">
        <div className="pc-row">
          <span className="pc-label">Original</span>
          <div className="pc-bar-wrapper">
            <div className="pc-bar original" style={{ width: "100%" }}>
              <span>${originalPrice}</span>
            </div>
          </div>
        </div>
        <div className="pc-row">
          <span className="pc-label">Best Dupe</span>
          <div className="pc-bar-wrapper">
            <div className="pc-bar dupe" style={{ width: `${Math.max(dupeWidth, 8)}%` }}>
              <span>${dupePrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceComparison;