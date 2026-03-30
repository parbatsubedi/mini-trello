import { useQuery } from "@tanstack/react-query"
import { projectService } from "../services/project.service"

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