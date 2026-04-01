import { useQuery } from "@tanstack/react-query"
import { projectService } from "../services/project.service"
import { useMutation } from "@tanstack/react-query"
import type { ProjectPayload } from "../types/types"

type CreateVariables = { payload: ProjectPayload }
type UpdateVariables = { id: number; payload: ProjectPayload }

export function useGetProject(params: {
  page: number
  per_page: number
  search: string
  status: string
}) {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => projectService.getProjects(params),
    placeholderData: (prevData) => prevData
  })
}

export function useGetProjectById(projectId: number) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectService.getProjectById(projectId),
    select: (data) => data.data, // Extract the project from the API response
    placeholderData: (prevData) => prevData
  })
}

export function useCreateProjectMutation() {
  return useMutation({
    mutationFn: ({ payload }: CreateVariables) => projectService.createProject(payload),
    onSuccess: () => {
      // Refetch all projects queries
      window.location.reload()
    },
  })
}

export function useUpdateProjectMutation() {
  return useMutation({
    mutationFn: ({ id, payload }: UpdateVariables) => projectService.updateProject(id, payload),
    onSuccess: () => {
      // Refetch all projects queries
      window.location.reload()
    },
  })
}
