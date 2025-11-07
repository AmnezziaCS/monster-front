import type { components, operations } from './api-types';

export const API_URL = import.meta.env.VITE_API_URL || '/api';

export type MonsterType = components['schemas']['MonsterDto'];

export type MonsterGetResponse =
    operations['MonsterController_getAllMonsters']['responses']['200']['content']['application/json'];
export type MonsterGetByIdResponse =
    operations['MonsterController_getMonsterById']['responses']['200']['content']['application/json'];
