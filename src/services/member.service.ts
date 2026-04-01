import { api } from "../lib/api";
import type { MemberPayload } from "../types/types";



export const memberService = {
    addMember: (payload: MemberPayload) => api.post('/members', payload),
    removeMember: (id: number) => api.delete(`/members/${id}`),
}