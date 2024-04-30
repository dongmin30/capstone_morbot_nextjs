import { getAssistants } from '@/app/actions_assistant'
import { SidebarItems } from '@/components/chat/sidebar-chat-items'
import { ThemeToggle } from '@/components/theme-toggle'
import { cache } from 'react'

interface SidebarListProps {
  userId?: string
  children?: React.ReactNode
}

const loadAssistants = cache(async (userId?: string) => {
  return await getAssistants(userId)
})

export async function SidebarAssistantList({ userId }: SidebarListProps) {
  const assistants = await loadAssistants(userId)

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        {assistants?.length ? (
          <div className="space-y-2 px-2">
            <SidebarItems chats={assistants} />
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
