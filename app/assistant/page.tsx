import { nanoid } from '@/lib/utils'
import { Assistant } from '@/components/assistant/assistant'
import { AI } from '@/lib/assistant/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '../actions_assistant'

export const metadata = {
  title: '어시스턴트 화면'
}

export default async function IndexPage() {
  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  return (
    <AI initialAIState={{ assistantId: id, messages: [] }}>
      <Assistant id={id} session={session} missingKeys={missingKeys} />
    </AI>
  )
}