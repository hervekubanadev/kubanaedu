export const queryKeys = {
  auth: {
    userContext: (userId: string) => ['auth', 'user-context', userId] as const,
  },
} as const
