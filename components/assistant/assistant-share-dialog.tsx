'use client'

import * as React from 'react'
import { type DialogProps } from '@radix-ui/react-dialog'
import { toast } from 'sonner'

import { ServerActionResult, type Assistant } from '@/lib/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { IconSpinner } from '@/components/ui/icons'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'

interface AssistantShareDialogProps extends DialogProps {
  assistant: Pick<Assistant, 'title' | 'assistantId' | 'id'>
  shareAssistant: (id: string) => ServerActionResult<Assistant>
  onCopy: () => void
}

export function AssistantShareDialog({
  assistant,
  shareAssistant: shareAssistant,
  onCopy,
  ...props
}: AssistantShareDialogProps) {
  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 })
  const [isSharePending, startShareTransition] = React.useTransition()

  const copyShareLink = React.useCallback(
    async (assistant: Assistant) => {
      if (!assistant.sharePath) {
        return toast.error('공유 링크 복사에 실패하였습니다.')
      }

      const url = new URL(window.location.href)
      url.pathname = assistant.sharePath
      copyToClipboard(url.toString())
      onCopy()
      toast.success('공유 링크를 복사하였습니다.')
    },
    [copyToClipboard, onCopy]
  )

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>링크를 통한 채팅 공유</DialogTitle>
          <DialogDescription>
            링크를 통하여 채팅 내역을 공유할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 space-y-1 text-sm border rounded-md">
          <div className="font-medium">{assistant.title}</div>
        </div>
        <DialogFooter className="items-center">
          <Button
            disabled={isSharePending}
            onClick={() => {
              // @ts-ignore
              startShareTransition(async () => {
                const result = await shareAssistant(assistant.assistantId)

                if (result && 'error' in result) {
                  toast.error(result.error)
                  return
                }

                copyShareLink(result)
              })
            }}
          >
            {isSharePending ? (
              <>
                <IconSpinner className="mr-2 animate-spin" />
                복사중...
              </>
            ) : (
              <>링크 복사</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
