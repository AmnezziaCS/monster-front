import React from 'react'
import './Footer.css'

const Footer: React.FC = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <h4 className="footer__title">À propos</h4>
          <p className="footer__text">Catalogue Officiel de Monster Front.</p>
        </div>
        <div>
          <h4 className="footer__title">Liens</h4>
          <ul className="footer__list">
            <li><a className="footer__link" href="#">Accueil</a></li>
            <li><a className="footer__link" href="#">Catalogue</a></li>
            <li><a className="footer__link" href="#">Saveurs</a></li>
            <li><a className="footer__link" href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="footer__title">Suivre</h4>
          <ul className="footer__list">
            <li><a className="footer__link" href="#">Instagram</a></li>
            <li><a className="footer__link" href="#">X / Twitter</a></li>
            <li><a className="footer__link" href="#">YouTube</a></li>
          </ul>
        </div>
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
