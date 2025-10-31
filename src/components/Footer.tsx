import React from 'react'
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
            <li><a className="footer__link" href="/">Accueil</a></li>
            <li><a className="footer__link" href="/catalog">Catalogue</a></li>
            <li><a className="footer__link" href="/flavors">Saveurs</a></li>
            <li><a className="footer__link" href="/contact">Contact</a></li>
          </ul>
        </nav>
        <nav aria-labelledby="footer-follow" className="footer__nav">
          <h4 id="footer-follow" className="footer__title">Suivre</h4>
          <ul className="footer__list">
            <li><a className="footer__link" href="#">Instagram</a></li>
            <li><a className="footer__link" href="#">X / Twitter</a></li>
            <li><a className="footer__link" href="#">YouTube</a></li>
          </ul>
        </nav>
      </div>
      <div className="footer__bottom">
        <div className="container footer__bottomInner">
          <small>© {year} Monster Catalog</small>
          <small className="muted">Projet personnel · sûrement pas affilié à Monster Energy (Vous inquiétez pas)</small>
        </div>
      </div>
    </footer>
  )
}

export default Footer
