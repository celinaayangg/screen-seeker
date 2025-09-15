import { Link } from "react-router-dom";
import "../css/Navbar.css";

function NavBar({ onHomeClick }) {

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Screen Seeker
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link" onClick={onHomeClick}>
          Home
        </Link>
        <Link to="/favourites" className="nav-link">
          Favourites
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
