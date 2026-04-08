import { api } from "../lib/api";
import type { MemberPayload } from "../types/types";
import type { ApiResponse } from "../lib/response";

export const memberService = {
    addMember: (payload: MemberPayload) => api.post<ApiResponse<null>>('/members', payload),
    removeMember: (id: number) => api.delete<ApiResponse<null>>(`/members/${id}`),
}