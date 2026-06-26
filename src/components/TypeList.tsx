import { Link } from 'react-router-dom';

import type { MonsterTypeList } from '../types/front-types';

const TypeList = ({ types }: { types: MonsterTypeList[] }) => (
    <ul>
        {types.map((type) => (
            <li key={type}>
                <Link to={`/type/${encodeURIComponent(type)}`}>{type}</Link>
            </li>
        ))}
    </ul>
);

export default TypeList;
