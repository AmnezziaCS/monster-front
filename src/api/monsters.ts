import type { Monster, MonsterTypeList } from '../types/front-types';
import { apiGet, type QueryParams } from './client';

export interface MonsterQuery {
    name?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
}

export interface PriceBounds {
    min: number;
    max: number;
}

export async function getMonsters(query: MonsterQuery = {}): Promise<Monster[]> {
    try {
        return await apiGet<Monster[]>('/monsters', query as QueryParams);
    } catch (err) {
        console.warn('Monsters API unavailable, using local fallback', err);
        const res = await fetch('/monsters.json');
        if (!res.ok) throw err;
        return res.json() as Promise<Monster[]>;
    }
}

export function getMonsterById(id: string | number): Promise<Monster> {
    return apiGet<Monster>(`/monsters/${id}`);
}

export async function getMonsterTypes(): Promise<MonsterTypeList[]> {
    const monsters = await getMonsters();
    return Array.from(new Set(monsters.map((m) => m.type))).sort();
}

export async function getPriceBounds(): Promise<PriceBounds | null> {
    try {
        const range = await apiGet<Partial<PriceBounds> & {
            minPrice?: number;
            maxPrice?: number;
        }>('/monsters/price-range');
        const min = range.min ?? range.minPrice;
        const max = range.max ?? range.maxPrice;
        if (typeof min === 'number') return { min, max: max ?? min };
    } catch {
        // fall through and derive bounds from the full list
    }

    const prices = (await getMonsters())
        .map((m) => (typeof m.price === 'number' ? m.price : Number(m.price)))
        .filter((p) => Number.isFinite(p));
    if (prices.length === 0) return null;
    return { min: Math.min(...prices), max: Math.max(...prices) };
}
