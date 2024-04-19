import { getAssistants } from '@/app/actions_assistant'
import { ClearHistory } from '@/components/chat/clear-history'
import { SidebarItems } from '@/components/sidebar-items'
import { ThemeToggle } from '@/components/theme-toggle'
import { cache } from 'react'

interface SidebarListProps {
  userId?: string
  children?: React.ReactNode
}

const loadChats = cache(async (userId?: string) => {
  return await getAssistants(userId)
})

export async function SidebarAssistantList({ userId }: SidebarListProps) {
  const chats = await loadChats(userId)

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        {chats?.length ? (
          <div className="space-y-2 px-2">
            <SidebarItems chats={chats} />
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">어시스턴트가 없습니다.</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between p-4">
        <ThemeToggle />
      </div>
    </div>
  )
}
