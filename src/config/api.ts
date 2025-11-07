export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    ENDPOINTS: {
        MONSTERS: '/monsters',
        MONSTER_BY_ID: (id: number) => `/monsters/${id}`,
    },
} as const;
