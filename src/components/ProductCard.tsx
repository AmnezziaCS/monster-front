import React from 'react'
import './ProductCard.css'
import type { Product } from '../mock/products'

type Props = {
  product: Product
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { name, flavor, imageUrl, sizeMl, caffeineMg, sugarGr, tags } = product
  return (
    <article className="card" tabIndex={0} aria-label={name}>
      <div className="card__media">
        <img src={imageUrl} alt={name} loading="lazy" />
      </div>
      <div className="card__body">
        <h3 className="card__title">{name}</h3>
        <p className="card__subtitle">{flavor} • {sizeMl}ml</p>
        <div className="card__meta">
          <span>{caffeineMg}mg caf</span>
          {sugarGr != null && <span>{sugarGr}g sucre</span>}
        </div>
        {tags?.length ? (
          <div className="card__tags">
            {tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}

export default ProductCard
