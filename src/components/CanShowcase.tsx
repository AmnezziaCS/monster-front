import React from 'react'
import CanDesign from './CanDesign'
import './CanShowcase.css'

const CanShowcase: React.FC = () => {
  return (
    <section className="cans" aria-label="Designs Monster Front">
      <div className="cans__grid">
        <div className="cans__item">
          <CanDesign label="Monster Front" variant="classic" accent="#09c909ff" />
        </div>
        <div className="cans__item">
          <CanDesign label="Monster Front" variant="ultra" accent="#efefefff" />
        </div>
        <div className="cans__item">
          <CanDesign label="Monster Front" variant="juice" accent="#22c55e" />
        </div>
      </div>
    </section>
  )
}

export default CanShowcase
