import { useQuery } from "@tanstack/react-query"
import { projectService } from "../services/project.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ProjectPayload, ProjectListItem, MetaType, LinksType } from "../types/types"
import { extractPaginatedData, extractSingleData } from "../lib/response"

type CreateVariables = { payload: ProjectPayload }
type UpdateVariables = { id: number; payload: ProjectPayload }

interface UseGetProjectResult {
  data: ProjectListItem[];
  meta: MetaType | undefined;
  links: LinksType | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function useGetProject(params: {
  page: number
  per_page: number
  search: string
  status: string
}): UseGetProjectResult {
  const query = useQuery({
    queryKey: ['projects', params],
    queryFn: () => projectService.getProjects(params),
    placeholderData: (prevData) => prevData
  })

  const paginatedData = extractPaginatedData<ProjectListItem>(query.data)

  return {
    data: paginatedData?.data ?? [],
    meta: paginatedData?.meta,
    links: paginatedData?.links,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
  }
}

export function useGetProjectById(projectId: number) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectService.getProjectById(projectId),
    select: (data) => extractSingleData<ProjectListItem>(data),
    enabled: !!projectId,
    placeholderData: (prevData) => prevData,
  })
}

export function useCreateProjectMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ payload }: CreateVariables) => projectService.createProject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useUpdateProjectMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: UpdateVariables) => projectService.updateProject(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}

export function useDeleteProjectMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => projectService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}