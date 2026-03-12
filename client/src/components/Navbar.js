import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
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
      </div>
    </nav>
  );
}

export default Navbar;