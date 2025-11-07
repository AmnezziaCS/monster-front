import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

interface HeaderProps {
    onSearch?: (searchTerm: string) => void;
    onNavigate?: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onNavigate }) => {
    const [open, setOpen] = useState(false);
    return (
        <header className={`header${open ? ' is-open' : ''}`}>
            <div className="container header__inner">
                <a
                    href="#"
                    className="brand"
                    aria-label="Monster Energy Home"
                    onClick={() => onNavigate?.('home')}
                >
                    <span className="brand__mark" />
                    <span className="brand__text">Monster Front</span>
                </a>

                <a
                    href="#"
                    className={`menu-btn${open ? ' menu-btn--active' : ''}`}
                    aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                    aria-controls="primary-nav"
                    aria-expanded={open}
                    role="button"
                    onClick={(e) => {
                        e.preventDefault();
                        setOpen((v) => !v);
                    }}
                >
                    <span className="menu-btn__bar" />
                    <span className="menu-btn__bar" />
                    <span className="menu-btn__bar" />
                </a>

                <nav id="primary-nav" className="nav" aria-label="Primary">
                    <Link
                        to="/catalog"
                        className="nav__link"
                        onClick={() => {
                            onNavigate?.('catalogue');
                            setOpen(false);
                        }}
                    >
                        Catalogue
                    </Link>

                    <Link
                        to="/contact"
                        className="nav__link nav__link--contact"
                        onClick={() => setOpen(false)}
                    >
                        Contact
                    </Link>
                </nav>

                <form className="search" role="search" aria-label="Recherche">
                    <input
                        className="search__input"
                        type="search"
                        placeholder="Rechercher une canette..."
                        aria-label="Rechercher"
                        onChange={(e) => {
                            onSearch?.(e.target.value);
                        }}
                    />
                </form>
            </div>
        </header>
    );
};

export default Header;
