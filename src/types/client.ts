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