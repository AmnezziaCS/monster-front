import type { MonsterT as MonsterType } from "../types/Monsters";

interface MonsterProps {
  monster: MonsterType;
}

const Monster = ({ monster }: MonsterProps) => {
  return (
    <div>
      <img src={monster.imageUrl} alt={monster.name} />
      <h2>{monster.name}</h2>
      <p>{monster.description}</p>
      <strong>{monster.price} €</strong>
      <span>{monster.type}</span>
    </div>
  );
};

export default Monster;
