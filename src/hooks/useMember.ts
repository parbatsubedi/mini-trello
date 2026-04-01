import { useMutation } from "@tanstack/react-query";
import { memberService } from "../services/member.service";
import type { MemberPayload } from "../types/types";

export function useAddMemberMutation() {
  return useMutation({
    mutationFn: ({ payload }: { payload: MemberPayload }) =>
      memberService.addMember(payload),
  })
}

export function useRemoveMemberMutation() {
  return useMutation({
    mutationFn: (id: number) => memberService.removeMember(id),
  })
}