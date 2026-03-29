import { api } from "../lib/api";
import type { DashboardData } from "../types/dashboard";

export const dashboardService = {
    getDashboardData: () => api.get<DashboardData>('/dashboard'),
}