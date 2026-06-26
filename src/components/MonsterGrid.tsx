import type { Monster } from '../types/front-types';
import MonsterCard from './Monster';
import './MonsterList.css';

const MonsterGrid = ({ monsters }: { monsters: Monster[] }) => (
    <div className="monster-list__grid">
        {monsters.map((monster) => (
            <MonsterCard key={monster.id} monster={monster} />
        ))}
    </div>
);

export default MonsterGrid;
