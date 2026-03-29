import { api } from "../lib/api";
import type { User } from "../types/user";

export const usersService = {
    getAllUsers: ()  => api.get<User[]>('/users'),
    getUserById: (id: string) => api.get<User>(`/users/${id}`),
    createUser: (data: Omit<User, 'id'>) => api.post<User>('/users', data),
    updateUser: (id: string, data: Partial<Omit<User, 'id'>>) => api.put<User>(`/users/${id}`, data),
    deleteUser: (id: string) => api.delete<void>(`/users/${id}`),
}