import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { labelService } from "../services/label.service";
import type { Label } from "../types/types";
import { extractPaginatedData } from "../lib/response";

export function useLabels(params?: { types?: ('task' | 'project' | 'both')[], search?: string, page?: number, per_page?: number }) {
    return useQuery({
        queryKey: ['labels', params],
        queryFn: () => labelService.getLabels(params),
        select: (data) => {
            const paginatedData = extractPaginatedData<Label>(data)
            return {
                data: paginatedData?.data ?? [],
                meta: paginatedData?.meta,
                links: paginatedData?.links,
            }
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
    })
}

export function useLabelById(labelId: number) {
    return useQuery({
        queryKey: ['label', labelId],
        queryFn: () => labelService.getLabelById(labelId),
        select: (data) => data?.data,
        enabled: !!labelId,
    })
}

export function useCreateLabelMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: { name: string; color: string; type: 'task' | 'project' | 'both' }) =>
            labelService.createLabel(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['labels'] })
        },
    })
}

export function useUpdateLabelMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: { name?: string; color?: string; type?: 'task' | 'project' | 'both' } }) =>
            labelService.updateLabel(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['labels'] })
        },
    })
}

export function useDeleteLabelMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => labelService.deleteLabel(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['labels'] })
        },
    })
}