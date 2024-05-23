import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { AssistantHandler } from '@/components/assistant/assistant-handler'

export default async function Page() {
  
  const session = (await auth()) as Session

  return (
    <AssistantHandler session={session} />
  );
}