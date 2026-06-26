import type { components, operations } from './api-types';

export type Monster = components['schemas']['MonsterDto'];
export type MonsterTypeList = components['schemas']['MonsterDto']['type'];

export type MonsterGetResponse =
    operations['MonsterController_getAllMonsters']['responses']['200']['content']['application/json'];
export type MonsterGetByIdResponse =
    operations['MonsterController_getMonsterById']['responses']['200']['content']['application/json'];
