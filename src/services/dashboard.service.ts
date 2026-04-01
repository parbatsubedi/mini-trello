import { api } from "../lib/api";
import type { DashboardApiResponse } from "../types/types";

export const dashboardService = {
    getDashboardData: () => api.get<DashboardApiResponse>('/dashboard'),
}