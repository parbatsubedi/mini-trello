import { api } from "../lib/api";
import type { User } from "../types/types";
import type { ApiResponse, PaginatedResponse } from "../lib/response";

export const usersService = {
    getAllUsers: ()  => api.get<PaginatedResponse<User>>('/users'),
    getUserById: (id: string) => api.get<ApiResponse<User>>(`/users/${id}`),
    createUser: (data: Omit<User, 'id'>) => api.post<ApiResponse<User>>('/users', data),
    updateUser: (id: string, data: Partial<Omit<User, 'id'>>) => api.put<ApiResponse<User>>(`/users/${id}`, data),
    deleteUser: (id: string) => api.delete<ApiResponse<null>>(`/users/${id}`),
}