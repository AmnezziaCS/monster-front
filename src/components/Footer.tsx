import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer: React.FC = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__grid">
          <section aria-labelledby="footer-about">
            <h4 id="footer-about" className="footer__title">À propos</h4>
            <p className="footer__text">Catalogue Officiel de Monster Front.</p>
          </section>
          <nav aria-labelledby="footer-links" className="footer__nav">
            <h4 id="footer-links" className="footer__title">Liens</h4>
            <ul className="footer__list">
              <li><Link className="footer__link" to="/">Accueil</Link></li>
              <li><Link className="footer__link" to="/catalog">Catalogue</Link></li>
              <li><Link className="footer__link" to="/flavors">Saveurs</Link></li>
              <li><Link className="footer__link" to="/contact">Contact</Link></li>
            </ul>
          </nav>
          <nav aria-labelledby="footer-follow" className="footer__nav">
            <h4 id="footer-follow" className="footer__title">Suivre</h4>
            <ul className="footer__list footer__socialList">
              <li>
                <a className="footer__link footer__social" href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjt8Q941BCOkliSggZYNgKOWmbwWWmoRfDAg&s" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.2"/>
                    <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.2"/>
                    <circle cx="17.5" cy="6.5" r="0.7" fill="currentColor"/>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
              </li>
              <li>
                <a className="footer__link footer__social" href="https://uploads.dailydot.com/2018/11/download.jpeg?q=65&auto=format&w=1600&ar=2:1&fit=crop" target="_blank" rel="noopener noreferrer" aria-label="X">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M4 7c2 2 6 6 9 9 3 3 6 4 7 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 7c-2 2-6 6-9 9-3 3-6 4-7 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="sr-only">X</span>
                </a>
              </li>
              <li>
                <a className="footer__link footer__social" href="https://i.pinimg.com/474x/58/24/b2/5824b2cc72bde0dca8c9abce2bbf6754.jpg" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M22 8.5s-.2-1.7-.8-2.4c-.7-.9-1.5-.9-1.9-1C16.6 4.5 12 4.5 12 4.5h0s-4.6 0-7.3.6c-.4.1-1.2.1-1.9 1C2.2 6.8 2 8.5 2 8.5S1.8 10.3 1.8 12.1v-.1c0 1.8.2 3.6.2 3.6s.2 1.7.8 2.4c.7.9 1.7.9 2.1 1 1.5.2 6.1.6 6.1.6s4.6 0 7.3-.6c.4-.1 1.2-.1 1.9-1 .6-.7.8-2.4.8-2.4s.2-1.8.2-3.6c0-1.8-.2-3.6-.2-3.6z" stroke="currentColor" strokeWidth="0.4"/>
                    <path d="M10 15V9l5 3-5 3z" fill="currentColor"/>
                  </svg>
                  <span className="sr-only">YouTube</span>
                </a>
              </li>
            </ul>
          </nav>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottomInner">
          <span>© {year} Monster Catalog</span>
          <span className="muted">Projet personnel · sûrement pas affilié à Monster Energy (Vous inquiétez pas)</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
