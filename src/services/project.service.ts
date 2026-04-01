import { api } from "../lib/api"
import type { PaginatedApiResponse, SingleApiResponse } from "../types/types"
import type { Project, ProjectPayload, ProjectListItem } from "../types/types"

interface ProjectQueryParams {
  page?: number
  per_page?: number
  search?: string
  status?: string
}

export const projectService = {
  getProjects: (params: ProjectQueryParams) => {
    const query = new URLSearchParams()

    if (params.page) query.append('page', String(params.page))
    if (params.per_page) query.append('per_page', String(params.per_page))
    if (params.search) query.append('search', params.search)
    if (params.status && params.status !== 'All') query.append('status', params.status)

    return api.get<PaginatedApiResponse<ProjectListItem>>(`/projects?${query.toString()}`)
  },

  getProjectById: (projectId: number) => {
    return api.get<SingleApiResponse<Project>>(`/projects/${projectId}`)
  },

  updateProject: (projectId: number, data: ProjectPayload) => {
    return api.put(`/projects/${projectId}`, data)
  },

  deleteProject: (projectId: number) => {
    return api.delete(`/projects/${projectId}`)
  },

  createProject : (data: ProjectPayload) => {
    return api.post(`/projects`, data)
  }
}