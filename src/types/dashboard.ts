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
    lastUpdated: string
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