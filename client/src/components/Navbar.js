import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ wishlistCount }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Dupe Finder</Link>
      <div className="navbar-links">
        <Link to="/" className={`navbar-link ${location.pathname === "/" ? "active" : ""}`}>
          Home
        </Link>
        <Link to="/categories" className={`navbar-link ${location.pathname === "/categories" ? "active" : ""}`}>
          Categories
        </Link>
        <Link to="/wishlist" className={`navbar-link ${location.pathname === "/wishlist" ? "active" : ""}`}>
          Wishlist {wishlistCount > 0 && <span className="navbar-badge">{wishlistCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;