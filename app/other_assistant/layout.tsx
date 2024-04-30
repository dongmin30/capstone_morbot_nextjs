import { SidebarDesktop } from '@/components/sidebar-desktop'

interface AssistantLayoutProps {
  children: React.ReactNode
}

export default async function AssistantLayout({ children }: AssistantLayoutProps) {
  return (
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      <SidebarDesktop />
      {children}
    </div>
  )
}