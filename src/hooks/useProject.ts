import { useQuery } from "@tanstack/react-query"
import { projectService } from "../services/project.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ProjectPayload } from "../types/project"

type CreateVariables = { payload: ProjectPayload }
type UpdateVariables = { id: number; payload: ProjectPayload }

const queryClient = useQueryClient()
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

export function useCreateProjectMutation() {
  return useMutation({
    mutationFn: ({ payload }: CreateVariables) => projectService.createProject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useUpdateProjectMutation() {
  return useMutation({
    mutationFn: ({ id, payload }: UpdateVariables) => projectService.updateProject(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}
