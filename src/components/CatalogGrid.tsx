import React from 'react'
import './CatalogGrid.css'
import ProductCard from './ProductCard'
import type { Product } from '../mock/products'

type Props = {
  products: Product[]
}

const CatalogGrid: React.FC<Props> = ({ products }) => {
  if (!products?.length) {
    return <p className="muted">Aucun produit pour le moment.</p>
  }
  return (
    <section className="catalog" aria-label="Catalogue">
      <div className="catalog__grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}

export default CatalogGrid
