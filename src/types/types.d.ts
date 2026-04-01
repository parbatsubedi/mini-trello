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

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Attachment {
  id: number;
  name: string;
  file_path?: string;
  url?: string;
  mime_type?: string;
  size?: number;
  task_id?: number;
  task?: Task;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  task?: Task;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  label: string;
  value: number | string;
  change: string;
  color: string;
}

export interface RecentProject {
  id: string;
  name: string;
  progress: number;
  members: number;
  tasks: number;
  status: 'active' | 'completed' | 'on-hold';
  updated_at: string;
}

export interface RecentActivity {
  id: string;
  description: string;
  timestamp: string;
  user: string;
  avatar: string;
  action: 'created' | 'updated' | 'completed' | 'commented';
  target: string;
  time: string;
}

export interface DashboardData {
  stats: DashboardStats[];
  recentProjects: RecentProject[];
  recentActivity: RecentActivity[];
}

export interface Department {
  id: number;
  name: string;
  description?: string;
}

export interface Label {
  id: number;
  name: string;
  color: string;
  type: 'task' | 'project' | 'both';
  created_at?: string;
  updated_at?: string;
  pivot?: {
    project_id?: number;
    label_id?: number;
  };
}

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: string;
  points: number;
  start_date: string;
  is_recurring: boolean;
  due_date: string;
  assignee: User | null;
  collaborators: User[];
  comments: Comment[];
  tags: Tag[];
  attachments: Attachment[];
  created_at: string;
  updated_at: string;
  project_id?: number;
  user_id?: number;
  assigned_to?: number | null;
  parent_id?: number | null;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
  slug?: string;
}

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface Client {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  address?: string;
  created_at: string;
  updated_at: string;
}

export interface ClientPayload {
  name: string;
  email: string;
  phone: string;
  company_name?: string;
  company?: string;
  address?: string;
}

export interface ProjectMember extends User {
  pivot?: {
    project_id: number;
    user_id: number;
  };
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  visibility: 'open' | 'closed';
  start_date: string;
  end_date: string;
  client_id?: number;
  project_type?: string;
  price?: string;
  creator: User;
  department: Department | null;
  members: ProjectMember[];
  labels: Label[];
  tasks: Task[];
  progress?: number;
  tasks_completed?: number;
  total_tasks?: number | null;
  created_at: string;
  updated_at: string;
  color?: string;
  user_id?: number;
  tasks_count?: number;
}

export interface ProjectWithClient extends Project {
  client: Client;
}

export interface ProjectListItem extends Omit<Project, 'client'> {
  creator: User;
  department: Department | null;
  members: ProjectMember[];
  labels: Label[];
  tasks: Task[];
  client: Client;
  user_id?: number;
  color?: string;
  tasks_count?: number;
}

export type ProjectPayload = {
  name: string;
  description: string;
  status: string;
  visibility: 'open' | 'closed';
  start_date: string;
  end_date: string;
  members: number[];
  labels: number[];
  project_type: string;
  price: number;
  client_id?: number;
  color?: string;
};

export type MemberPayload = {
  project_id: number;
  user_id: number;
};

export type TaskPayload = {
  title: string;
  description: string;
  project_id: number;
  user_id?: number;
  priority: Priority;
  status: string;
  points?: number;
  start_date?: string;
  due_date?: string;
  assignee_id?: number | null;
  assigned_users?: number[];
  tags?: number[];
  labels?: number[];
  parent_id?: number | null;
  is_recurring?: boolean;
};

// API Response wrapper for single resource
export interface SingleApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

// API Response wrapper for paginated list
export interface PaginatedApiResponse<T> {
  status: string;
  message: string;
  data: T[];
  links: LinksType;
  meta: MetaType;
}

// API Response wrapper for dashboard
export interface DashboardApiResponse {
  status: string;
  message: string;
  data: DashboardData;
}

// Dashboard specific types
export interface DashboardStatsResponse {
  label: string;
  value: number | string;
  change: string;
  color: string;
}

export interface DashboardProject {
  id: number;
  name: string;
  description: string;
  status: string;
  visibility: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  client_id?: number;
  project_type?: string;
  price?: string;
  creator: User;
  department: Department | null;
  members: ProjectMember[];
  client: Client;
  labels: Label[];
  tasks: Task[];
}