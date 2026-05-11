import type { PropsWithChildren } from 'react'
import { uiConstants } from '../../shared/config/design-system'
import { cn } from '../../shared/lib/cn'

type PageContainerProps = PropsWithChildren<{
  className?: string
}>

export function PageContainer({ className, children }: PageContainerProps) {
  return <main className={cn(uiConstants.layout.pageContainer, className)}>{children}</main>
}
