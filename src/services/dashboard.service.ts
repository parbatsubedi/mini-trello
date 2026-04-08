import { api } from "../lib/api";
import type { ApiResponse } from "../lib/response";
import type { DashboardData } from "../types/types";

export const dashboardService = {
    getDashboardData: () => api.get<ApiResponse<DashboardData>>('/dashboard'),
}