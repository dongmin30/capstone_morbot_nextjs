import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Explain technical concepts',
    message: `What is a "serverless function"?`
  },
  {
    heading: 'Summarize an article',
    message: 'Summarize the following article for a 2nd grader: \n'
  },
  {
    heading: 'Draft an email',
    message: `Draft an email to my boss about the following: \n`
  }
]

export function EmptyAssistantScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          AI 모르봇 문서 어시스턴트
        </h1>
        <p className="leading-normal text-muted-foreground">
          모르봇 문서 어시스턴트는 사용자가 올린 문서를 읽고 검색하여 질문에 답변할 수 있습니다.
        </p>
        <p className="leading-normal text-muted-foreground">
          모르봇에게 문서를 제공하고 문서에 대해 질문하세요!
        </p>
      </div>
    </div>
  )
}
