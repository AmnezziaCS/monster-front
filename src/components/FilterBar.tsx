import React from 'react'
import './FilterBar.css'

type Props = {
  total?: number
}

const FilterBar: React.FC<Props> = ({ total }) => {
  return (
    <section className="filters" aria-label="Filtres du catalogue">
      <div className="filters__row">
        <div className="filters__group">
          <label className="filters__label">Rechercher</label>
          <input className="input" placeholder="Nom, saveur…" />
        </div>
        <div className="filters__group">
          <label className="filters__label">Catégorie</label>
          <select className="select">
            <option>Tout</option>
            <option>Ultra</option>
            <option>Zero-sugar</option>
            <option>Juice</option>
          </select>
        </div>
        <div className="filters__group">
          <label className="filters__label">Taille</label>
          <select className="select">
            <option>All</option>
            <option>355ml</option>
            <option>473ml</option>
            <option>500ml</option>
          </select>
        </div>
        <div className="filters__spacer" />
        <div className="filters__count">{total != null ? `${total} produits` : null}</div>
      </div>
    </section>
  )
}

export default FilterBar
