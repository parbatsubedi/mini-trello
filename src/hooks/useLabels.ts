import { useQuery } from "@tanstack/react-query";
import { labelService } from "../services/label.service";

export function useLabels(types: ('task' | 'project' | 'both')[]) {
    return useQuery({
        queryKey: ['labels', types],
        queryFn: () => labelService.getLabels(types),
        staleTime: 5 * 60 * 1000, // 5 minutes cache
        retry: 2,
    })
}