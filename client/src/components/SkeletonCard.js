import "./SkeletonCard.css";

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img shimmer" />
      <div className="skeleton-body">
        <div className="skeleton-line short shimmer" />
        <div className="skeleton-line shimmer" />
        <div className="skeleton-line medium shimmer" />
        <div className="skeleton-footer">
          <div className="skeleton-price shimmer" />
          <div className="skeleton-btn shimmer" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;