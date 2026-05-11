import { queryOptions } from '@tanstack/react-query'
import type { PostgrestError, User } from '@supabase/supabase-js'
import type { AppRole, UserContext } from '../../types/auth'
import { supabase } from '../../supabase/client'
import { queryKeys } from '../query-keys'

const validRoles = new Set<AppRole>(['owner', 'admin', 'staff', 'parent', 'student'])

type ProfileContextRow = {
  school_id: string | null
  role: string | null
}

function resolveRole(user: User, profileRole: string | null): AppRole | null {
  const metadataRole = user.app_metadata.role
  if (typeof metadataRole === 'string' && validRoles.has(metadataRole as AppRole)) {
    return metadataRole as AppRole
  }

  if (profileRole && validRoles.has(profileRole as AppRole)) {
    return profileRole as AppRole
  }

  return null
}

function isMissingProfilesTable(error: PostgrestError | null): boolean {
  return error?.code === '42P01'
}

export async function fetchUserContext(user: User): Promise<UserContext> {
  const { data, error } = await supabase
    .from('profiles')
    .select('school_id, role')
    .eq('id' as never, user.id)
    .maybeSingle<ProfileContextRow>()

  if (error && !isMissingProfilesTable(error)) {
    throw error
  }

  return {
    userId: user.id,
    email: user.email ?? null,
    schoolId: data?.school_id ?? (typeof user.app_metadata.school_id === 'string' ? user.app_metadata.school_id : null),
    role: resolveRole(user, data?.role ?? null),
  }
}

export function userContextQueryOptions(user: User) {
  return queryOptions({
    queryKey: queryKeys.auth.userContext(user.id),
    queryFn: () => fetchUserContext(user),
  })
}
