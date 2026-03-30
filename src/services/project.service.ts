import { api } from "../lib/api"
import type { ApiResponse } from "../types/apiResponse"
import type { Project } from "../types/project"

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

    return api.get<ApiResponse<Project[]>>(`/projects?${query.toString()}`)
  }
}