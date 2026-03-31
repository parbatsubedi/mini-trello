import type { Department } from "./department";
import type { Label } from "./label";
import type { User } from "./user";

export interface Project {
    id: number;
    name: string;
    description: string;
    status: string;
    visibility: 'open' | 'closed';
    start_date: string; // ISO date string
    end_date: string; // ISO date string
    creator: User;
    department: Department;
    members: User[];
    labels: Label[];
    progress: number; // percentage of completion
    tasks_completed: number;
    total_tasks: number;
    tasks_count: number;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    color: string;
    project_type: string;
    price: number;
    client_id: number | null;
}

export type ProjectPayload = {
  name: string
  description: string
  status: string
  visibility: 'open' | 'closed'
  start_date: string
  end_date: string
  members: number[]
  labels: number[]
  project_type: string
  price: number
  client_id?: number
  color?: string
}
