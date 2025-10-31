import type { components } from "../types/api-types";
import './Monster.css'

interface MonsterProps {
  monster: components["schemas"]["MonsterDto"];
}

const Monster = ({ monster }: MonsterProps) => {
  return (
    <article className="monster" aria-labelledby={`monster-${monster.id}-title`}>
      <figure className="monster__media">
        <img src={monster.imageUrl} alt={monster.name} />
      </figure>
      <div className="monster__body">
        <header>
          <h3 id={`monster-${monster.id}-title`} className="monster__title">{monster.name}</h3>
        </header>
        <p className="monster__desc">{monster.description}</p>
        <footer className="monster__meta">
          <span className="monster__price">{monster.price} €</span>
          <span className="monster__type">{monster.type}</span>
        </footer>
      </div>
    </article>
  );
};

export default Monster;
