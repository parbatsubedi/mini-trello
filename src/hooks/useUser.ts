import { useQuery, useMutation } from "@tanstack/react-query";
import { usersService } from "../services/users.service";
import type { User } from "../types/types";
import { extractPaginatedData, extractSingleData } from "../lib/response";

export function useUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => usersService.getAllUsers(),
        select: (data) => extractPaginatedData<User>(data)?.data ?? [],
    })
}

export function useUserById(userId: string) {
    return useQuery({
        queryKey: ['user', userId],
        queryFn: () => usersService.getUserById(userId),
        select: (data) => extractSingleData<User>(data),
        enabled: !!userId,
    })
}

export function useCreateUserMutation() {
    return useMutation({
        mutationFn: (data: Omit<User, 'id'>) => usersService.createUser(data),
        onSuccess: () => {
            window.location.reload()
        },
    })
}

export function useUpdateUserMutation() {
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Omit<User, 'id'>> }) => 
            usersService.updateUser(id, data),
        onSuccess: () => {
            window.location.reload()
        },
    })
}

export function useDeleteUserMutation() {
    return useMutation({
        mutationFn: (id: string) => usersService.deleteUser(id),
        onSuccess: () => {
            window.location.reload()
        },
    })
}