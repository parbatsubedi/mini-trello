import { api } from "../lib/api";
import type { Task, TaskPayload } from "../types/types";


export const taskService = {
    getTasks: (projectId: number) => api.get<Task[]>(`/projects/${projectId}/tasks`),
    getTasksById: (taskId: number) => api.get<Task>(`/tasks/${taskId}`),
    createTask: (payload: TaskPayload) => api.post('/tasks', payload),
    updateTask: (id: number, payload: TaskPayload) => api.put(`/tasks/${id}`, payload),
    deleteTask: (id: number) => api.delete(`/tasks/${id}`),
    assignUser: (taskId: number, userIds: number[]) => 
        api.post(`/tasks/${taskId}/assign-user`, { user_ids: userIds }),
    assignCollaborators: (taskId: number, userIds: number[]) => 
        api.post(`/tasks/${taskId}/assign-collaborators`, { user_ids: userIds }),
}