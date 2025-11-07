import { useEffect, useMemo, useState } from 'react';

import MonsterCard from '../components/Monster';
import { API_URL, type Monster } from '../types/front-types';

interface TypeMonstersProps {
    type?: string;
}

const TypeMonsters = ({ type }: TypeMonstersProps) => {
    const [monsters, setMonsters] = useState<Monster[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const isAll = !type || type === 'all';
                const endpoint = isAll
                    ? `${API_URL}/monsters`
                    : `${API_URL}/monsters?${new URLSearchParams({ type: String(type) }).toString()}`;

                const response = await fetch(endpoint);

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const data: Monster[] = await response.json();
                setMonsters(data);
            } catch (error) {
                console.error('Erreur de chargement :', error);
                setError(
                    error instanceof Error ? error.message : 'Erreur inconnue',
                );
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [type]);

    const monstersByType = useMemo(() => {
        return monsters.reduce<Record<string, Monster[]>>((acc, item) => {
            const key = item.type;
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});
    }, [monsters]);

    if (loading) {
        return (
            <div>
                <h1>
                    {type && type !== 'all'
                        ? `Monsters de type: ${type}`
                        : 'Tous les types'}
                </h1>
                <p>Chargement des produits...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>
                    {type && type !== 'all'
                        ? `Monsters de type: ${type}`
                        : 'Tous les types'}
                </h1>
                <p style={{ color: 'red' }}>Erreur: {error}</p>
            </div>
        );
    }

    const showGrouped = !type || type === 'all';

    return (
        <div>
            <h1>
                {showGrouped ? 'Tous les types' : `Monsters de type: ${type}`}
            </h1>
            {!showGrouped && <p>{monsters.length} produits trouvés</p>}
            {showGrouped ? (
                <div>
                    {Object.entries(monstersByType).map(
                        ([groupType, group]) => (
                            <section
                                key={groupType}
                                style={{ marginBottom: 24 }}
                            >
                                <h2>{groupType}</h2>
                                <p>{group.length} produits</p>
                                <div>
                                    {group.map((monster) => (
                                        <MonsterCard
                                            key={monster.id}
                                            monster={monster}
                                        />
                                    ))}
                                </div>
                            </section>
                        ),
                    )}
                </div>
            ) : (
                <div>
                    {monsters.map((monster) => (
                        <MonsterCard key={monster.id} monster={monster} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TypeMonsters;
