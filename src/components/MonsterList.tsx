import { getMonsters } from '../api';
import { useFetch } from '../hooks/useFetch';
import type { Monster } from '../types/front-types';
import MonsterGrid from './MonsterGrid';
import './MonsterList.css';

interface MonsterListProps {
    searchTerm?: string;
    minPrice?: number;
    maxPrice?: number;
}

const inPriceRange = (monster: Monster, min?: number, max?: number) => {
    const price =
        typeof monster.price === 'number' ? monster.price : Number(monster.price);
    if (typeof min === 'number' && price < min) return false;
    if (typeof max === 'number' && price > max) return false;
    return true;
};

const matchesSearch = (monster: Monster, term: string) => {
    if (!term) return true;
    const needle = term.toLowerCase();
    return (
        (monster.name ?? '').toLowerCase().includes(needle) ||
        (monster.type ?? '').toLowerCase().includes(needle)
    );
};

const MonsterList = ({
    searchTerm = '',
    minPrice,
    maxPrice,
}: MonsterListProps) => {
    const term = searchTerm.trim();

    const { data, loading, error } = useFetch(
        () => getMonsters({ name: term || undefined, minPrice, maxPrice }),
        [term, minPrice, maxPrice],
    );

    if (loading) return <p>Chargement des produits...</p>;
    if (error)
        return (
            <div>
                <p style={{ color: 'red' }}>Erreur: {error}</p>
                <p>Vérifiez que le backend est démarré sur le port 3000</p>
            </div>
        );

    const monsters = (data ?? [])
        .filter((m) => inPriceRange(m, minPrice, maxPrice))
        .filter((m) => matchesSearch(m, term));

    return (
        <div className="monster-list__wrap">
            <MonsterGrid monsters={monsters} />
            {searchTerm && monsters.length === 0 && (
                <p className="monster-list__no-results">
                    Aucun produit trouvé pour "{searchTerm}"
                </p>
            )}
        </div>
    );
};

export default MonsterList;
