'use client'

import { Assistant } from '@/lib/types'
import { AnimatePresence, motion } from 'framer-motion'

import { removeAssistant, shareAssistant } from '@/app/actions_assistant'

import { SidebarActions } from '@/components/assistant/sidebar-assistant-actions'
import { SidebarItem } from '@/components/assistant/sidebar-assistant-item'

interface SidebarItemsProps {
  assistants?: Assistant[]
}

export function SidebarItems({ assistants }: SidebarItemsProps) {
  if (!assistants?.length) return null

  return (
    <AnimatePresence>
      {assistants.map(
        (chat, index) =>
          chat && (
            <motion.div
              key={chat?.id}
              exit={{
                opacity: 0,
                height: 0
              }}
            >
              <SidebarItem index={index} chat={chat}>
                <SidebarActions
                  assistant={chat}
                  removeChat={removeAssistant}
                  shareChat={shareAssistant}
                />
              </SidebarItem>
            </motion.div>
          )
      )}
    </AnimatePresence>
  )
}
