import React from 'react';

import './PriceSlider.css';

interface PriceSliderProps {
    min: number;
    max: number;
    valueMin: number;
    valueMax: number;
    step?: number;
    onChange: (min: number, max: number) => void;
}

const PriceSlider: React.FC<PriceSliderProps> = ({
    min,
    max,
    valueMin,
    valueMax,
    step = 0.1,
    onChange,
}) => {
    const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Math.min(Number(e.target.value), valueMax);
        onChange(Number(v.toFixed(2)), valueMax);
    };
    const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Math.max(Number(e.target.value), valueMin);
        onChange(valueMin, Number(v.toFixed(2)));
    };
    return (
        <div className="price-slider card">
            <div className="price-slider__row">
                <div className="price-slider__label">
                    Min: <strong>{valueMin}€</strong>
                </div>
                <div className="price-slider__label">
                    Max: <strong>{valueMax}€</strong>
                </div>
            </div>

            <div className="price-slider__controls">
                <input
                    aria-label="Prix min"
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={valueMin}
                    onChange={handleMin}
                />
                <input
                    aria-label="Prix max"
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={valueMax}
                    onChange={handleMax}
                />
            </div>
        </div>
    );
};

export default PriceSlider;
