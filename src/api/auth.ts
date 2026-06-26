import { apiPost } from './client';

export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    username: string;
    isAdmin: boolean;
}

export function login(payload: LoginPayload): Promise<LoginResponse> {
    return apiPost<LoginResponse>('/login', payload);
}

const ADMIN_KEY = 'isAdmin';

export function setAdminSession(isAdmin: boolean): void {
    if (isAdmin) localStorage.setItem(ADMIN_KEY, 'true');
    else localStorage.removeItem(ADMIN_KEY);
}

export function isAdminSession(): boolean {
    return localStorage.getItem(ADMIN_KEY) === 'true';
}

export function clearAdminSession(): void {
    localStorage.removeItem(ADMIN_KEY);
}
