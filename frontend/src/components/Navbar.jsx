import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const { isLoggedIn } = useAuth();
  return (
    <nav className="mb-3 navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          YelpCamp
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/campground" end>
              Campgrounds
            </NavLink>
            <NavLink className="nav-link" to="/campground/new">
              New Campground
            </NavLink>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row">
        {!isLoggedIn && <LoginButton />}
        {isLoggedIn && <LogoutButton />}
      </div>
    </nav>
  );
}
