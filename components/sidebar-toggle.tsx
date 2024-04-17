'use client'

import * as React from 'react'

import { useSidebar } from '@/lib/hooks/use-sidebar'
import { Button } from '@/components/ui/button'
import { IconChat, IconAssistant } from '@/components/ui/icons'

interface SidebarToggleContext {
  mode: string;
}

export function SidebarToggle({ mode }: SidebarToggleContext) {
  const { toggleSidebar, changeMode } = useSidebar()

  return (
    <Button
      variant="ghost"
      className="-ml-2 hidden text-sm p-0 lg:flex"
      onClick={() => {
        toggleSidebar(mode);
        changeMode(mode);
      }}
    >
      {/* {mode === 'chatMode' ? <IconChat className="size-6" /> : <IconAssistant  className="size-6" />} */}
      {mode === 'chatMode' ? <IconChat className="size-5 mr-3" /> : <IconAssistant className="size-5 mr-3" />}
      {mode === 'chatMode' ? '채팅' : '어시스턴트'}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}
