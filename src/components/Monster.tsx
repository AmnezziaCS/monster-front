import { Link } from 'react-router-dom';

import type { Monster } from '../types/front-types';
import './Monster.css';

interface MonsterProps {
    monster: Monster;
}

const MonsterCard = ({ monster }: MonsterProps) => {
    return (
        <article
            className="monster"
            aria-labelledby={`monster-${monster.id}-title`}
        >
            <Link to={`/${monster.id}`} className="monster__link">
                <div className="monster__media">
                    <img src={monster.imageUrl} alt={monster.name} />
                </div>
                <div className="monster__body">
                    <h3
                        id={`monster-${monster.id}-title`}
                        className="monster__title"
                    >
                        {monster.name}
                    </h3>
                    <p className="monster__desc">{monster.description}</p>
                    <div className="monster__meta">
                        <span className="monster__price">
                            {monster.price} €
                        </span>
                        <span className="monster__type">{monster.type}</span>
                    </div>
                </div>
            </Link>
        </article>
    );
};

export default MonsterCard;
