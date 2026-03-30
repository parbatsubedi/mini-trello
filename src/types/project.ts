import type { Department } from "./department";
import type { User } from "./user";

export interface Project {
    id: number;
    name: string;
    description: string;
    status: string;
    start_date: string; // ISO date string
    end_date: string; // ISO date string
    creator: User;
    department: Department;
    members: User[];
    progress: number; // percentage of completion
    tasks_completed: number;
    total_tasks: number;
    tasks_count: number;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    color: string;
}

