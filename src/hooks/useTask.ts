import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "../services/task.service";
import type { TaskPayload } from "../types/types";

export function useCreateTaskMutation() {
  return useMutation({
    mutationFn: ({ payload }: { payload: TaskPayload }) =>
      taskService.createTask(payload),
  })
}

export function useUpdateTaskMutation() {
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: TaskPayload }) =>
      taskService.updateTask(id, payload),
  })
}

export function useDeleteTaskMutation() {
  return useMutation({
    mutationFn: (id: number) => taskService.deleteTask(id),
  })
}

export function useAssignUserMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ taskId, userIds }: { taskId: number; userIds: number[] }) =>
      taskService.assignUser(taskId, userIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export function useAssignCollaboratorsMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ taskId, userIds }: { taskId: number; userIds: number[] }) =>
      taskService.assignCollaborators(taskId, userIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}