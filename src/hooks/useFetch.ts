import { useEffect, useState } from 'react';

export interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useFetch<T>(
    fetcher: () => Promise<T>,
    deps: unknown[],
    enabled = true,
): FetchState<T> {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: enabled,
        error: null,
    });

    useEffect(() => {
        if (!enabled) {
            setState({ data: null, loading: false, error: null });
            return;
        }

        let cancelled = false;
        setState({ data: null, loading: true, error: null });

        fetcher()
            .then((data) => {
                if (!cancelled) setState({ data, loading: false, error: null });
            })
            .catch((err: unknown) => {
                if (cancelled) return;
                setState({
                    data: null,
                    loading: false,
                    error: err instanceof Error ? err.message : 'Erreur inconnue',
                });
            });

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, enabled]);

    return state;
}
