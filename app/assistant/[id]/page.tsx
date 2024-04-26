import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { auth } from '@/auth'
import { getAssistant, getMissingKeys } from '@/app/actions_assistant'
import { Assistant } from '@/components/assistant/assistant'
import { AI } from '@/lib/assistant/actions'
import { Session } from '@/lib/types'

export interface AssistantPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: AssistantPageProps): Promise<Metadata> {
  const session = await auth()

  if (!session?.user) {
    return {}
  }

  const assistant = await getAssistant(params.id, session.user.id)
  return {
    title: assistant?.title.toString().slice(0, 50) ?? 'Assistant'
  }
}

export default async function AssistantPage({ params }: AssistantPageProps) {
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  if (!session?.user) {
    redirect(`/login?next=/assistant/${params.id}`)
  }

  const userId = session.user.id as string
  const assistant = await getAssistant(params.id, userId)

  if (!assistant) {
    redirect('/assistant')
  }

  if (assistant?.userId !== session?.user?.id) {
    notFound()
  }

  return (
    <AI initialAIState={{ assistantId: assistant.id, messages: assistant.messages }}>
      <Assistant
        id={assistant.id}
        session={session}
        initialMessages={assistant.messages}
        missingKeys={missingKeys}
      />
    </AI>
  )
}
