import { api } from "../lib/api";
import type { Client, ClientPayload } from "../types/types";

export const clientService = {
    getClients: () => api.get<Client[]>('/clients'),
    getClient: (id: number) => api.get<Client>(`/clients/${id}`),
    createClient: (payload: ClientPayload) => api.post('/clients', payload),
    updateClient: (id: number, payload: ClientPayload) => api.put(`/clients/${id}`, payload),
    deleteClient: (id: number) => api.delete(`/clients/${id}`),
}