import { useState, useEffect } from "react";
import API_URL from "../config";
import "./DupeModal.css";

function DupeModal({ dupe, onClose, onWishlist, isWishlisted }) {
  const [images, setImages] = useState([dupe.image]);
  const [activeImg, setActiveImg] = useState(dupe.image);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${API_URL}/api/amazon/product/${dupe.asin}`);
        
        // Check if the response is ok (status 200)
        if (!res.ok) {
          // If endpoint doesn't exist or fails, just use the original image
          setImages([dupe.image]);
          setActiveImg(dupe.image);
          setLoading(false);
          return;
        }
        
        const data = await res.json();
        if (data.imageUrlList && data.imageUrlList.length > 0) {
          setImages(data.imageUrlList);
          setActiveImg(data.imageUrlList[0]);
        } else {
          setImages([dupe.image]);
        }
      } catch (err) {
        // Silently fail and use the original image
        console.error("Failed to fetch additional images:", err);
        setImages([dupe.image]);
      }
      setLoading(false);
    };
    fetchImages();
  }, [dupe.asin, dupe.image]);

  const handleShare = () => {
    navigator.clipboard.writeText(dupe.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rating = dupe.productRating ? dupe.productRating.split(" ")[0] : null;
  const stars = rating ? "★".repeat(Math.round(parseFloat(rating))) + "☆".repeat(5 - Math.round(parseFloat(rating))) : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-content">
          <div className="modal-images">
            <div className="modal-main-img">
              <img src={activeImg} alt={dupe.name} />
            </div>
            {!loading && images.length > 1 && (
              <div className="modal-thumbnails">
                {images.slice(0, 6).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`view ${i}`}
                    className={activeImg === img ? "thumb active" : "thumb"}
                    onClick={() => setActiveImg(img)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="modal-info">
            {dupe.brand && <p className="modal-brand">{dupe.brand}</p>}
            <h2 className="modal-name">{dupe.name}</h2>
            {stars && (
              <p className="modal-rating">
                <span className="stars">{stars}</span>
                {rating} · {dupe.countReview?.toLocaleString()} reviews
              </p>
            )}
            <p className="modal-price">${dupe.price}</p>

            <div className="modal-actions">
              <a href={dupe.link} target="_blank" rel="noreferrer" style={{ flex: 1 }}>
                <button className="modal-btn">View on Amazon ↗</button>
              </a>
              <button
                className={`modal-heart ${isWishlisted ? "wishlisted" : ""}`}
                onClick={onWishlist}
              >
                {isWishlisted ? "♥" : "♡"}
              </button>
              <button className="modal-share" onClick={handleShare}>
                {copied ? "✓" : "⎘"}
              </button>
            </div>
            {copied && <p className="modal-copied">Link copied to clipboard!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DupeModal;