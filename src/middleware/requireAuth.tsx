import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function isTokenExpired(token: string) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

export default function RequireAuth({ children }: PropsWithChildren) {
  const location = useLocation()
  const token = localStorage.getItem('token')

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('token')
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}