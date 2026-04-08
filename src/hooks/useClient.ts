import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clientService } from "../services/client.service";
import type { Client, ClientPayload } from "../types/types";
import { extractData, extractPaginatedData } from "../lib/response";

export function useClient() {
    return useQuery({
        queryKey: ['clients'],
        queryFn: () => clientService.getClients(),
        // select: (data) => extractPaginatedData<Client>(data)?.data ?? [],
        select: (data) => extractData<Client>(data) ?? [],
        staleTime: 5 * 60 * 1000,
        retry: 2,
    })
}

export function useClientById(clientId: number) {
    return useQuery({
        queryKey: ['client', clientId],
        queryFn: () => clientService.getClient(clientId),
        select: (data) => data?.data,
        enabled: !!clientId,
    })
}

export function useCreateClientMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (payload: ClientPayload) => clientService.createClient(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] })
        },
    })
}

export function useUpdateClientMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: ClientPayload }) =>
            clientService.updateClient(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] })
        },
    })
}

export function useDeleteClientMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => clientService.deleteClient(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] })
        },
    })
}