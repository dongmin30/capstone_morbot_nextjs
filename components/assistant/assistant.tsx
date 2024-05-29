'use client'

import { AssistantMessage as Message } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { ChatMessage } from '@/components/chat-message'
import { ChatPrompt } from '@/components/chat-prompt'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ChatProps {
  messages: Message[]
  handleSubmit: (input: string) => void
  isLoading: boolean
  dataParams: { assistantId: string; threadId: string }
  className?: string
}

export function Chat({ dataParams, messages, handleSubmit, isLoading, className }: ChatProps) {
  const router = useRouter()
  const path = usePathname()
  useEffect(() => {
    if (!path.includes('assistant') && messages.length === 0) {
      window.history.replaceState({}, '', `/assistant/${dataParams.assistantId}/thread/${dataParams.threadId}`)
    }
  }, [path, messages])

  useEffect(() => {
    if (messages.length === 0) {
      router.refresh()
    }
  }, [router])

  return (
    <div className="flex w-full flex-col">
      <div className="w-full grow overflow-auto">
        <div className={cn('pt-4 md:pt-10', className)}>
          {messages.length > 0 && (
            <div className="relative mx-auto max-w-3xl px-8">
              {messages.map((message, index) => (
                <div key={`msg-${index}-${message.content.length}`}>
                  <ChatMessage message={message} />
                  {index < messages.length - 1 && <Separator className="my-4 md:my-8" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="inset-x-0 bottom-0 w-full">
        <div className="mx-auto max-w-3xl sm:px-4">
          <ChatPrompt isLoading={isLoading} onSubmit={handleSubmit} />
          <p className="hidden px-2 py-1 text-center text-xs leading-normal text-muted-foreground sm:block">
            모르봇에게 제공한 파일의 내용에 대해 물어보세요!
          </p>
        </div>
      </div>
    </div>
  )
}
