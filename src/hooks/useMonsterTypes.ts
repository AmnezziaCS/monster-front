import { getMonsterTypes } from '../api';
import { useFetch } from './useFetch';

export function useMonsterTypes() {
    const { data, loading, error } = useFetch(() => getMonsterTypes(), []);
    return { types: data ?? [], loading, error };
}
