



// // src/components/Header/Header.jsx
// import React, { useState, useEffect, useContext } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import {
//   FaSearch,
//   FaShoppingCart,
//   FaUser,
//   FaBars,
//   FaTimes,
//   FaTshirt,
//   FaAngleDown,
//   FaAngleRight
// } from 'react-icons/fa';
// import './Header.css';
// import { UserContext } from "../../Context/UserContext";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const closeMenu = () => setIsMenuOpen(false);

//   // Trigger search navigation
//   const handleSearch = () => {
//     if (!searchQuery.trim()) return;
//     navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
//     setSearchQuery("");
//     closeMenu();
//   };

//   return (
//     <header className={`header ${scrolled ? 'scrolled' : ''}`}>
//       <div className="container">
//         {/* Logo */}
//         <div className="logo">
//           <FaTshirt className="logo-icon" size={30} />
//           <h1>Fan<span>Gear</span> Central</h1>
//         </div>

//         {/* Navigation */}
//         <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
//           <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
//           <NavLink to="/shop" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Shop</NavLink>

//           {/* Collections Dropdown */}
//           <div className="dropdown">
//             <span className="dropdown-toggle">
//               Collections <FaAngleDown />
//             </span>
//             <div className="dropdown-menu">
//               <div className="dropdown-item">
//                 <span>
//                   Football Club <FaAngleRight />
//                 </span>
//                 <div className="dropdown-submenu">
//                   <NavLink to="/collections/football/barcelona" onClick={closeMenu}>Barcelona</NavLink>
//                   <NavLink to="/collections/football/chelsea" onClick={closeMenu}>Chelsea</NavLink>
//                   <NavLink to="/collections/football/psg" onClick={closeMenu}>PSG</NavLink>
//                 </div>
//               </div>
//               <div className="dropdown-item">
//                 <span>
//                   Basketball Club <FaAngleRight />
//                 </span>
//                 <div className="dropdown-submenu">
//                   <NavLink to="/collections/basketball/lakers" onClick={closeMenu}>Lakers</NavLink>
//                   <NavLink to="/collections/basketball/warriors" onClick={closeMenu}>Warriors</NavLink>
//                   <NavLink to="/collections/basketball/bulls" onClick={closeMenu}>Bulls</NavLink>
//                 </div>
//               </div>
//               <NavLink to="/collections/tennis" onClick={closeMenu} className="dropdown-item">Tennis</NavLink>
//               <NavLink to="/collections/cricket" onClick={closeMenu} className="dropdown-item">Cricket</NavLink>
//               <NavLink to="/collections/fanart" onClick={closeMenu} className="dropdown-item">Custom/Fan Art Wear</NavLink>
//             </div>
//           </div>

//           <NavLink to="/blog" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink>
//           <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>

//           {/* My Orders */}
//           {user && (
//             <NavLink to="/orders" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>
//               My Orders
//             </NavLink>
//           )}

//           {/* Admin Panel */}
//           {user?.isAdmin && (
//             <NavLink to="/admin" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>
//               Admin Panel
//             </NavLink>
//           )}
//         </nav>

//         {/* Actions */}
//         <div className="header-actions">
//           <div className="search-bar">
//             <FaSearch onClick={handleSearch} style={{ cursor: "pointer" }} />
//             <input
//               type="text"
//               placeholder="Search team or product..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
//             />
//           </div>

//           <NavLink to="/cart" className="cart-icon"><FaShoppingCart /></NavLink>
//           <NavLink to="/account" className="user-icon"><FaUser /></NavLink>

//           <button
//             className="menu-toggle"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;



// src/components/Header/Header.jsx
import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaTshirt,
  FaAngleDown,
  FaAngleRight
} from 'react-icons/fa';
import './Header.css';
import { UserContext } from "../../Context/UserContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
    closeMenu();
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <FaTshirt className="logo-icon" size={30} />
          <h1>Fan<span>Gear</span> Central</h1>
        </div>

        {/* Navigation */}
        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/shop" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Shop</NavLink>

          {/* Collections Dropdown */}
          <div className="dropdown">
            <span className="dropdown-toggle">
              Collections <FaAngleDown />
            </span>
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <span>
                  Football Club <FaAngleRight />
                </span>
                <div className="dropdown-submenu">
                  <NavLink to="/collections/football/barcelona" onClick={closeMenu}>Barcelona</NavLink>
                  <NavLink to="/collections/football/chelsea" onClick={closeMenu}>Chelsea</NavLink>
                  <NavLink to="/collections/football/psg" onClick={closeMenu}>PSG</NavLink>
                </div>
              </div>
              <div className="dropdown-item">
                <span>
                  Basketball Club <FaAngleRight />
                </span>
                <div className="dropdown-submenu">
                  <NavLink to="/collections/basketball/lakers" onClick={closeMenu}>Lakers</NavLink>
                  <NavLink to="/collections/basketball/warriors" onClick={closeMenu}>Warriors</NavLink>
                  <NavLink to="/collections/basketball/bulls" onClick={closeMenu}>Bulls</NavLink>
                </div>
              </div>
              <NavLink to="/collections/tennis" onClick={closeMenu} className="dropdown-item">Tennis</NavLink>
              <NavLink to="/collections/cricket" onClick={closeMenu} className="dropdown-item">Cricket</NavLink>
              <NavLink to="/collections/fanart" onClick={closeMenu} className="dropdown-item">Custom/Fan Art Wear</NavLink>
            </div>
          </div>

          <NavLink to="/blog" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink>
          <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>

          {/* Account (replaces My Orders) */}
          {user && (
            <NavLink to="/Dashboard" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>
              Account
            </NavLink>
          )}

          {/* Admin Panel */}
          {user?.isAdmin && (
            <NavLink to="/admin" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>
              Admin Panel
            </NavLink>
          )}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <div className="search-bar">
            <FaSearch onClick={handleSearch} style={{ cursor: "pointer" }} />
            <input
              type="text"
              placeholder="Search team or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
            />
          </div>

          <NavLink to="/cart" className="cart-icon"><FaShoppingCart /></NavLink>
          <NavLink to="/account" className="user-icon"><FaUser /></NavLink>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
