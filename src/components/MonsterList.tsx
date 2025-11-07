import { useLayoutEffect, useState } from 'react';

import { API_URL, type Monster } from '../types/front-types';
import MonsterCard from './Monster';
import './MonsterList.css';

interface MonsterListProps {
    searchTerm?: string;
    minPrice?: number;
    maxPrice?: number;
}

const MonsterList = ({
    searchTerm = '',
    minPrice,
    maxPrice,
}: MonsterListProps) => {
    const [monsters, setMonsters] = useState<Monster[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useLayoutEffect(() => {
        const fetchMonsters = async () => {
            try {
                setLoading(true);
                setError(null);
                const params = new URLSearchParams();
                const trimmed = searchTerm.trim();
                if (trimmed) params.set('name', trimmed);
                if (typeof minPrice === 'number')
                    params.set('minPrice', String(minPrice));
                if (typeof maxPrice === 'number')
                    params.set('maxPrice', String(maxPrice));
                const url = `${API_URL}/monsters${params.toString() ? `?${params.toString()}` : ''}`;

                try {
                    const response = await fetch(url);
                    if (!response.ok)
                        throw new Error(`Erreur HTTP: ${response.status}`);
                    const data: Monster[] = await response.json();

                    const withPriceFilter = data.filter((m) => {
                        const price =
                            typeof m.price === 'number'
                                ? m.price
                                : Number(m.price);
                        if (typeof minPrice === 'number' && price < minPrice)
                            return false;
                        if (typeof maxPrice === 'number' && price > maxPrice)
                            return false;
                        return true;
                    });

                    setMonsters(withPriceFilter);
                } catch (backendErr) {
                    console.warn(
                        'Backend fetch failed, using local monsters.json fallback',
                        backendErr,
                    );
                    try {
                        const local = await fetch('/monsters.json');
                        if (!local.ok)
                            throw new Error('Local fallback not available');
                        const data: Monster[] = await local.json();
                        const withPriceFilter = data.filter((m) => {
                            const price =
                                typeof m.price === 'number'
                                    ? m.price
                                    : Number(m.price);
                            if (
                                typeof minPrice === 'number' &&
                                price < minPrice
                            )
                                return false;
                            if (
                                typeof maxPrice === 'number' &&
                                price > maxPrice
                            )
                                return false;
                            return true;
                        });
                        setMonsters(withPriceFilter);
                    } catch {
                        throw backendErr;
                    }
                }
            } catch (error) {
                console.error('Erreur de chargement :', error);
                setError(
                    error instanceof Error ? error.message : 'Erreur inconnue',
                );
            } finally {
                setLoading(false);
            }
        };
        fetchMonsters();
    }, [searchTerm, minPrice, maxPrice]);

    if (loading) {
        return (
            <div>
                <p>Chargement des produits...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <p style={{ color: 'red' }}>Erreur: {error}</p>
                <p>Vérifiez que le backend est démarré sur le port 3000</p>
            </div>
        );
    }

    const filteredMonsters = monsters.filter((monster) => {
        const trimmed = searchTerm.trim();
        if (!trimmed) return true;
        const searchLower = trimmed.toLowerCase();
        const name = (monster.name || '').toString().toLowerCase();
        const type = (monster.type || '').toString().toLowerCase();
        return name.includes(searchLower) || type.includes(searchLower);
    });

    return (
        <div className="monster-list__wrap">
            <div className="monster-list__grid">
                {filteredMonsters.map((monster) => (
                    <MonsterCard key={monster.id} monster={monster} />
                ))}
            </div>
            {searchTerm && filteredMonsters.length === 0 && (
                <p className="monster-list__no-results">
                    Aucun produit trouvé pour "{searchTerm}"
                </p>
            )}
        </div>
    );
};

export default MonsterList;
