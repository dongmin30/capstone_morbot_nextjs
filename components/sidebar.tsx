'use client'

import * as React from 'react'

import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'

export interface SidebarProps extends React.ComponentProps<'div'> {
  children: React.ReactNode[],
  mobileYn: boolean
}

export function Sidebar({ className, mobileYn, children }: SidebarProps) {
  const { isSidebarOpen, isLoading, mode } = useSidebar()

  return (
    <div
      data-state={isSidebarOpen && !isLoading ? 'open' : 'closed'}
      className={cn(className, 'h-full flex-col dark:bg-zinc-950')}
    >
      {/* chatMode의 경우 채팅 히스토리 출력, 아닌 경우 어시스턴트 출력 */}
      {mobileYn ? children[0] : (mode === 'chatMode' ? children[0] : children[1])}
    </div>
  )
}
