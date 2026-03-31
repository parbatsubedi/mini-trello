import { api } from "../lib/api";
import type { Label } from "../types/label";

export const labelService = {
    getLabels: (types: ('task' | 'project' | 'both')[]) => {
        const params = new URLSearchParams()
        types.forEach((t, i) => params.append(`type[${i}]`, t))

        console.log('Fetching labels with types:', types)
        return api.get<Label[]>(`/labels?${params.toString()}`)
    },
    createLabel: (data: { name: string, color: string, type: 'task' | 'project' | 'both' }) => api.post('/labels', data),
    updateLabel: (id: number, data: { name?: string, color?: string, type?: 'task' | 'project' | 'both' }) => api.put(`/labels/${id}`, data),
    deleteLabel: (id: number) => api.delete(`/labels/${id}`),
}