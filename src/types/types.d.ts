export interface LinksType {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface MetaLinksType {
  url: string | null;
  label: string;
  active: boolean;
  page: number | null;
}

export interface MetaType {
  current_page: number;
  from: number;
  last_page: number;
  links: MetaLinksType[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

// Generic API Response
export interface ApiResponse<T> {
  data: T;
  links: LinksType;
  meta: MetaType;
}



export interface User {
    id: number
    name: string
    email: string
}

export interface Attachment {
  id: number
  name: string
  file_path: string
  url: string
  mime_type: string
  size: number
  task_id: number
  task: Task
  created_at: string
  updated_at: string
}

export interface Client {
    id: number
    name: string
    email: string
    phone: string
    company: string
    created_at: string
    updated_at: string
}

export interface ClientPayload {
    name: string
    email: string
    phone: string
    company: string
}

export interface Comment {
    id: number
    content: string
    user: User
    task : Task
    created_at: string
    updated_at: string
}


export interface DashboardStats {
    label: string
    value: number
    change: string
    color: string
}

export interface RecentProject {
    id: string
    name: string
    progress: number
    members: number
    tasks: number
    status: 'active' | 'completed' | 'on-hold'
    updated_at: string
}

export interface RecentActivity {
    id: string
    description: string
    timestamp: string
    user: string
    avatar: string
    action: 'created' | 'updated' | 'completed' | 'commented'
    target: string
    time: string
}

export interface DashboardData {
    stats: DashboardStats[]
    recentProjects: RecentProject[]
    recentActivity: RecentActivity[]
}

export interface Department {
    id: number;
    name: string;
    description: string;
}

export interface Label {
  id: number
  name: string
  color: string
  type: 'task' | 'project' | 'both'
}

export interface Task {
  id: number
  title: string
  description: string
  priority: Priority
  status: string
  points: number
  start_date: any
  is_recurring: boolean
  due_date: string
  assignee: User | null
  tags: any[]
  attachments: Attachment[] | null
  created_at: string
  updated_at: string
}

export interface Tag {
  id: number
  name: string
  color: string
  slug: string
}

export type Priority = 'low' | 'medium' | 'high' | 'urgent'

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
    tasks: Task[];
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


export type MemberPayload = {
  project_id: number
  user_id: number
}

export type TaskPayload = {
  title: string
  description: string
  project_id: number
  user_id?: number
  priority: Priority
  status: string
  points?: number
  start_date?: string
  due_date?: string
  assignee_id?: number | null
  assigned_users?: number[]
  tags?: number[]
  labels?: number[]
  parent_id?: number | null
  is_recurring?: boolean
}