'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'

interface SidebarMobileProps {
  children: React.ReactNode[]
  mode: string
}

export function SidebarMobile({ children, mode }: SidebarMobileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="-ml-2 flex text-sm p-0 lg:hidden">
          {mode === 'chatMode' ? '채팅' : '어시스턴트'}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="inset-y-0 flex h-auto w-[300px] flex-col p-0"
      >
        <Sidebar className="flex" mobileYn={true}>{children}</Sidebar>
      </SheetContent>
    </Sheet>
  )
}
