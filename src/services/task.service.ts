import { api } from "../lib/api";
import type { Task, TaskPayload } from "../types/types";
import type { ApiResponse, PaginatedResponse } from "../lib/response";

export const taskService = {
    getTasks: (projectId: number) => api.get<PaginatedResponse<Task>>(`/projects/${projectId}/tasks`),
    getTaskById: (taskId: number) => api.get<ApiResponse<Task>>(`/tasks/${taskId}`),
    createTask: (payload: TaskPayload) => api.post<ApiResponse<Task>>('/tasks', payload),
    updateTask: (id: number, payload: TaskPayload) => api.put<ApiResponse<Task>>(`/tasks/${id}`, payload),
    deleteTask: (id: number) => api.delete<ApiResponse<null>>(`/tasks/${id}`),
    assignUser: (taskId: number, userIds: number[]) => 
        api.post<ApiResponse<null>>(`/tasks/${taskId}/assign-user`, { user_ids: userIds }),
    assignCollaborators: (taskId: number, userIds: number[]) => 
        api.post<ApiResponse<null>>(`/tasks/${taskId}/assign-collaborators`, { user_ids: userIds }),
}