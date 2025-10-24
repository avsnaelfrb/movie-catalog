import "../style/Navbar.css";
import { FaSearch, FaBell } from "react-icons/fa";
import profilePicture from "../assets/sergio-de-paula-c_GmwfHBDzk-unsplash.jpg";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Bagian Kiri: Logo dan Menu Utama */}
        <div className="navbar-left">
          <h1 className="navbar-logo">NETFOX</h1>
        </div>
        {/* Bagian Kanan: Ikon dan Profil */}
        <div className="navbar-right">
          <a href="#" className="nav-link active">
            Home
          </a>
          <a href="#" className="nav-link">
            Movies
          </a>
          <a href="#" className="nav-link">
            Series
          </a>
          <FaSearch className="nav-icon" />
          <FaBell className="nav-icon" />
          <img src={profilePicture} alt="Profile" className="profile-pic" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
