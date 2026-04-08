import { api } from "../lib/api";
import type { Client, ClientPayload } from "../types/types";
import type { ApiResponse, } from "../lib/response";

export const clientService = {
    getClients: () => api.get<ApiResponse<Client[]>>('/clients'),
    getClient: (id: number) => api.get<ApiResponse<Client>>(`/clients/${id}`),
    createClient: (payload: ClientPayload) => api.post<ApiResponse<Client>>('/clients', payload),
    updateClient: (id: number, payload: ClientPayload) => api.put<ApiResponse<Client>>(`/clients/${id}`, payload),
    deleteClient: (id: number) => api.delete<ApiResponse<null>>(`/clients/${id}`),
}