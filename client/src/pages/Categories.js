import { useNavigate } from "react-router-dom";
import "./Categories.css";

const CATEGORIES = [
  { 
    label: "🔥 Trending Now", 
    emoji: "📈", 
    searches: [
      "Bogg Bag dupe", 
      "Hulken Bag dupe", 
      "Oura Ring dupe", 
      "Birkin dupe",
      "Sand and Fog"
    ],
    trend: "hot"
  },
  { 
    label: "Perfume Dupes", 
    emoji: "🌸", 
    searches: [
      "Baccarat Rouge dupe",
      "Creed Aventus dupe", 
      "Club de Nuit",
      "LV Imagination dupe",
      "Mojave Ghost dupe"
    ],
    trend: "rising"
  },
  { 
    label: "Bag Dupes", 
    emoji: "👜", 
    searches: [
      "Bottega Veneta Bag dupe",
      "Louis Vuitton Bag dupe", 
      "Goyard dupe",
      "Miu Miu sunglasses dupe",
      "City bag dupe"
    ],
    trend: "popular"
  },
  { 
    label: "Activewear", 
    emoji: "🏋️‍♀️", 
    searches: [
      "Lululemon Leggings dupe",
      "Alo Yoga dupe", 
      "Vuori shorts dupe",
      "Skims dupe"
    ],
    trend: "stable"
  },
  { 
    label: "Shoes", 
    emoji: "👟", 
    searches: [
      "Golden Goose Sneakers dupe",
      "UGG Boots dupe", 
      "Dr. Martens dupe",
      "Hoka Shoes dupe",
      "On Cloud Shoes dupe"
    ],
    trend: "stable"
  },
  { 
    label: "Home & Furniture", 
    emoji: "🏠", 
    searches: [
      "Pottery Barn dupe",
      "West Elm dupe", 
      "Mackenzie Childs dupe",
      "Le Creuset dupe",
      "Lola blanket dupe"
    ],
    trend: "rising"
  },
  { 
    label: "Beauty", 
    emoji: "💄", 
    searches: [
      "La Mer dupe",
      "Rhode glazing milk dupe",
      "Kerastase night serum dupe",
      "Tatcha Rice Wash dupe"
    ],
    trend: "rising"
  },
  { 
    label: "Kitchen", 
    emoji: "🍳", 
    searches: [
      "Ninja Creami dupe",
      "Le Creuset dupe",
      "Staub Dutch Oven dupe",
      "Nespresso Machine dupe"
    ],
    trend: "stable"
  }
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
            <div key={cat.label} className={`category-card ${cat.trend === 'hot' ? 'trending-hot' : ''}`}>
              <div className="category-emoji">{cat.emoji}</div>
              <h2 className="category-name">
                {cat.label}
                {cat.trend === 'hot' && <span className="hot-badge">HOT</span>}
                {cat.trend === 'rising' && <span className="rising-badge">↗️</span>}
              </h2>
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