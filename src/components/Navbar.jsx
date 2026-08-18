import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="w-full bg-white shadow-[0_2px_10px_rgba(25,118,210,0.08)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-8">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Bank Logo"
            className="h-12 w-12 rounded-full object-cover"
          />
          <h2 className="text-xl font-bold text-[#1976d2] md:text-[23px]">
            Banking Portal
          </h2>
        </div>

        <button
          className="text-3xl text-[#1976d2] md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          &#9776;
        </button>

        <div
          className={`absolute left-0 top-[76px] z-50 w-full bg-white px-6 py-6 shadow-lg md:static md:flex md:w-auto md:items-center md:bg-transparent md:p-0 md:shadow-none ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          <ul className="flex flex-col items-center gap-5 md:flex-row md:gap-6">
            <li><Link className="text-[#455a64] hover:text-[#1976d2]" to="/" onClick={closeMenu}>Home</Link></li>
            <li><a className="text-[#455a64] hover:text-[#1976d2]" href="/#features" onClick={closeMenu}>Features</a></li>
            <li><a className="text-[#455a64] hover:text-[#1976d2]" href="/#services" onClick={closeMenu}>Services</a></li>
            <li><a className="text-[#455a64] hover:text-[#1976d2]" href="/#contact" onClick={closeMenu}>Contact</a></li>
          </ul>

          <div className="mt-5 flex flex-col gap-3 md:ml-8 md:mt-0 md:flex-row">
            <Link
              to="/login"
              onClick={closeMenu}
              className="w-44 rounded-md border border-[#1976d2] px-5 py-2 text-center text-[#1976d2] transition hover:bg-[#eaf4ff] md:w-auto"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={closeMenu}
              className="w-44 rounded-md bg-[#1976d2] px-5 py-2 text-center text-white transition hover:bg-[#42a5f5] md:w-auto"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
