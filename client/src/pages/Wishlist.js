import DupeCard from "../components/DupeCard";
import "./Wishlist.css";

function Wishlist({ wishlist, onWishlist, onCardClick }) {
  return (
    <div className="wishlist-page">
      <header className="categories-hero">
        <p className="tagline">✨ your saved finds</p>
        <h1 className="categories-title">My Wishlist</h1>
        <p className="categories-subtitle">
          {wishlist.length > 0
            ? `${wishlist.length} item${wishlist.length > 1 ? "s" : ""} saved`
            : "Heart any dupe to save it here"}
        </p>
      </header>

      <main className="wishlist-main">
        {wishlist.length === 0 ? (
          <div className="empty-state">
            <p className="empty-emoji">🤍</p>
            <p className="empty-title">No saved dupes yet</p>
            <p className="empty-sub">Hit the ♡ on any dupe to save it here!</p>
          </div>
        ) : (
          <div className="results-grid">
            {wishlist.map((dupe, index) => (
              <DupeCard
                key={index}
                {...dupe}
                isWishlisted={true}
                onWishlist={() => onWishlist(dupe)}
                onClick={() => onCardClick(dupe)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Wishlist;