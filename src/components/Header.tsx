import React, { useState } from 'react'
import './Header.css'

interface HeaderProps {
  onSearch?: (searchTerm: string) => void;
  onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <header className={`header${open ? ' is-open' : ''}`}>
      <div className="container header__inner">
        <a href="#" className="brand" aria-label="Monster Energy Home">
          <span className="brand__mark" />
          <button onClick={() => onNavigate?.("home")}>
            <span className="brand__text">
            Monster Front
          </span>
          </button>
          
        </a>

        <button
          className={`menu-btn${open ? ' menu-btn--active' : ''}`}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-controls="primary-nav"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-btn__bar" />
          <span className="menu-btn__bar" />
          <span className="menu-btn__bar" />
        </button>

        <nav id="primary-nav" className="nav" aria-label="Primary">
          <button
            className="nav__link"
            onClick={() => onNavigate?.("catalogue")}
          >
            Catalogue
          </button>
          <button className="nav__link">Saveurs</button>
          <button className="nav__link">Contact</button>
        </nav>

        <form
          className="search"
          role="search"
          aria-label="Recherche"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch?.(searchTerm);
          }}
        >
          <input
            className="search__input"
            type="search"
            placeholder="Rechercher une canette..."
            aria-label="Rechercher"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch?.(e.target.value);
            }}
          />
        </form>
      </div>
    </header>
  );
};

export default Header
