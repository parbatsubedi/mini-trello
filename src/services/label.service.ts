import { api } from "../lib/api";
import type { Label } from "../types/types";
import type { ApiResponse, PaginatedResponse } from "../lib/response";

export const labelService = {
    getLabels: (params?: { types?: ('task' | 'project' | 'both')[], search?: string, page?: number, per_page?: number }) => {
        const queryParams = new URLSearchParams()

        if (params?.types && params.types.length > 0) {
            params.types.forEach(type => {
                queryParams.append('type[]', type)
            })
        }

        if (params?.search) {
            queryParams.append('search', params.search)
        }

        if (params?.page) {
            queryParams.append('page', params.page.toString())
        }

        if (params?.per_page) {
            queryParams.append('per_page', params.per_page.toString())
        }

        return api.get<PaginatedResponse<Label>>(`/labels?${queryParams.toString()}`)
    },
    getLabelById: (id: number) => api.get<ApiResponse<Label>>(`/labels/${id}`),
    createLabel: (data: { name: string, color: string, type: 'task' | 'project' | 'both' }) =>
        api.post<ApiResponse<Label>>('/labels', data),
    updateLabel: (id: number, data: { name?: string, color?: string, type?: 'task' | 'project' | 'both' }) =>
        api.put<ApiResponse<Label>>(`/labels/${id}`, data),
    deleteLabel: (id: number) => api.delete<ApiResponse<null>>(`/labels/${id}`),
}