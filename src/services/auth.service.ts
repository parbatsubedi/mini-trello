import { api } from "../lib/api";

export const authService = {
    login: (email: string, password: string) => 
        api.post<{access_token: string}>('/auth/login', { email, password }),
    register: (name: string, email: string, password: string) => 
        api.post<{access_token: string}>('/auth/register', { name, email, password }),
    logout: () => {
        api.post<void>('/auth/logout', {})
    }
}