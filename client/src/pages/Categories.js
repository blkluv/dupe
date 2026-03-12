import { useNavigate } from "react-router-dom";
import "./Categories.css";

const CATEGORIES = [
  { label: "Hair Tools", emoji: "💇‍♀️", searches: ["Dyson Airwrap", "Dyson Blow Dryer", "Hot Tools Curling Iron"] },
  { label: "Bags & Purses", emoji: "👜", searches: ["Bottega Veneta Bag", "Louis Vuitton Bag", "Prada Bag"] },
  { label: "Activewear", emoji: "🏋️‍♀️", searches: ["Lululemon Leggings", "Lululemon Sports Bra", "Alo Yoga Leggings"] },
  { label: "Shoes", emoji: "👟", searches: ["Golden Goose Sneakers", "UGG Boots", "Dr. Martens"] },
  { label: "Clothing", emoji: "👗", searches: ["Skims Bodysuit", "Aritzia Jacket", "Free People Dress"] },
  { label: "Skincare", emoji: "✨", searches: ["La Mer Moisturizer", "SK-II Essence", "Tatcha Rice Wash"] },
  { label: "Kitchen", emoji: "🍳", searches: ["Le Creuset", "Staub Dutch Oven", "Vitamix Blender"] },
  { label: "Accessories", emoji: "🧣", searches: ["Acne Studios Scarf", "Bottega Veneta Sunglasses", "Mejuri Jewelry"] },
];

function Categories({ onSearch }) {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    onSearch(query);
    navigate("/");
  };

  return (
    <div className="categories-page">
      <header className="categories-hero">
        <p className="tagline">✨ luxury looks, budget prices</p>
        <h1 className="categories-title">Browse by Category</h1>
        <p className="categories-subtitle">Pick a category and find dupes you'll love</p>
      </header>

      <main className="categories-main">
        <div className="categories-grid">
          {CATEGORIES.map(cat => (
            <div key={cat.label} className="category-card">
              <div className="category-emoji">{cat.emoji}</div>
              <h2 className="category-name">{cat.label}</h2>
              <div className="category-searches">
                {cat.searches.map(s => (
                  <button
                    key={s}
                    className="category-chip"
                    onClick={() => handleSearch(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Categories;