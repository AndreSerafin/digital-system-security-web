'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Roles = 'SUPER_ADMIN' | 'SYSTEM_ADMIN' | 'TECHINICAL_MANAGER'

interface Props {
  children: React.ReactNode
  allowedRoles: Roles[]
  type?: 'route' | 'component'
}

export function PermissionGate({
  children,
  allowedRoles,
  type = 'route',
}: Props) {
  const { data: session, status } = useSession()
  const router = useRouter()

  const userType = session?.role

  useEffect(() => {
    if (status === 'loading') return

    const isAllowedRole = userType
      ? allowedRoles.includes(userType as Roles)
      : false

    if (status === 'unauthenticated' || !isAllowedRole) {
      if (type === 'route') {
        router.back()
      }
    }
  }, [status, userType, allowedRoles, type, router])

  if (
    status === 'loading' ||
    status === 'unauthenticated' ||
    !allowedRoles.includes(session?.role as Roles)
  ) {
    return null
  }

  return <>{children}</>
}
