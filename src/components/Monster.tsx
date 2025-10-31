import type { components } from "../types/api-types";
import './Monster.css'

interface MonsterProps {
  monster: components["schemas"]["MonsterDto"];
}

const Monster = ({ monster }: MonsterProps) => {
  return (
    <article className="monster">
      <div className="monster__media">
        <img src={monster.imageUrl} alt={monster.name} />
      </div>
      <div className="monster__body">
        <h3 className="monster__title">{monster.name}</h3>
        <p className="monster__desc">{monster.description}</p>
        <div className="monster__meta">
          <span className="monster__price">{monster.price} €</span>
          <span className="monster__type">{monster.type}</span>
        </div>
      </div>
    </article>
  );
};

export default Monster;
