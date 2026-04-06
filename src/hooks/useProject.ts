import { useQuery } from "@tanstack/react-query"
import { projectService } from "../services/project.service"
import { useMutation } from "@tanstack/react-query"
import type { ProjectPayload, ProjectListItem, MetaType, LinksType } from "../types/types"

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

  return {
    data: query.data?.data ?? [],
    meta: query.data?.meta,
    links: query.data?.links,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
  }
}

export function useGetProjectById(projectId: number) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectService.getProjectById(projectId),
    select: (data) => data.data,
    enabled: !!projectId, //prevent query from running if projectId is not provided or null undefined and other falsy values
    placeholderData: (prevData) => prevData,
    
  })
}

export function useCreateProjectMutation() {
  return useMutation({
    mutationFn: ({ payload }: CreateVariables) => projectService.createProject(payload),
    onSuccess: () => {
      window.location.reload()
    },
  })
}

export function useUpdateProjectMutation() {
  return useMutation({
    mutationFn: ({ id, payload }: UpdateVariables) => projectService.updateProject(id, payload),
    onSuccess: () => {
      window.location.reload()
    },
  })
}