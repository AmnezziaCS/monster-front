export const API_URL = import.meta.env.VITE_API_URL || '/api';

export type QueryParams = Record<string, string | number | boolean | undefined>;

function buildQuery(params?: QueryParams): string {
    if (!params) return '';
    const entries = Object.entries(params).filter(
        ([, value]) => value !== undefined && value !== '',
    );
    if (entries.length === 0) return '';
    const search = new URLSearchParams(
        entries.map(([key, value]) => [key, String(value)]),
    );
    return `?${search.toString()}`;
}

export async function apiGet<T>(path: string, params?: QueryParams): Promise<T> {
    const res = await fetch(`${API_URL}${path}${buildQuery(params)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<T>;
}
