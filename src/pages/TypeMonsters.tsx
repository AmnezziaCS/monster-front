import { useMemo } from 'react';

import { getMonsters } from '../api';
import AsyncContent from '../components/AsyncContent';
import MonsterGrid from '../components/MonsterGrid';
import { useFetch } from '../hooks/useFetch';
import type { Monster } from '../types/front-types';

interface TypeMonstersProps {
    type?: string;
}

const TypeMonsters = ({ type }: TypeMonstersProps) => {
    const showAll = !type || type === 'all';

    const { data, loading, error } = useFetch(
        () => getMonsters(showAll ? {} : { type }),
        [type, showAll],
    );
    const monsters = useMemo(() => data ?? [], [data]);

    const groups = useMemo(() => {
        const byType = new Map<string, Monster[]>();
        for (const monster of monsters) {
            const group = byType.get(monster.type) ?? [];
            group.push(monster);
            byType.set(monster.type, group);
        }
        return [...byType.entries()];
    }, [monsters]);

    return (
        <div>
            <h1>{showAll ? 'Tous les types' : `Monsters de type: ${type}`}</h1>
            <AsyncContent
                loading={loading}
                error={error}
                loadingText="Chargement des produits..."
            >
                {showAll ? (
                    groups.map(([groupType, group]) => (
                        <section key={groupType} style={{ marginBottom: 24 }}>
                            <h2>{groupType}</h2>
                            <p>{group.length} produits</p>
                            <MonsterGrid monsters={group} />
                        </section>
                    ))
                ) : (
                    <>
                        <p>{monsters.length} produits trouvés</p>
                        <MonsterGrid monsters={monsters} />
                    </>
                )}
            </AsyncContent>
        </div>
    );
};

export default TypeMonsters;
