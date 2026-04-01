import { api } from "../lib/api";
import type { DashboardData } from "../types/types";

export const dashboardService = {
    getDashboardData: () => api.get<DashboardData>('/dashboard'),
}