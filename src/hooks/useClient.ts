import { useQuery } from "@tanstack/react-query";
import { clientService } from "../services/client.service";

export function useClient() {
    return useQuery({
        queryKey: ['clients'],
        queryFn: () => clientService.getClients(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
    })
}