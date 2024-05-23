'use client'

import { useCallback, useEffect, useReducer } from 'react'
import { readStreamableValue } from 'ai/rsc'
import { createMessage, listMessages, runThread } from '@/lib/assistant/actions'
import { AssistantMessage as Message } from '@/lib/types'
import { Chat } from '@/components/assistant/assistant'

interface PageProps {
  params: { assistantId: string; threadId: string }
}

type State = {
  messages: Message[]
  isLoading: boolean
}

type Action =
  | { type: 'ADD_MESSAGE'; message: Message }
  | { type: 'UPDATE_LAST_MESSAGE'; content: string }
  | { type: 'SET_LOADING'; isLoading: boolean }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.message] }
    case 'UPDATE_LAST_MESSAGE':
      const updatedMessages = [...state.messages]
      updatedMessages[updatedMessages.length - 1].content = action.content
      return { ...state, messages: updatedMessages }
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading }
    default:
      return state
  }
}

export default function Page({ params }: PageProps) {
  const [state, dispatch] = useReducer(reducer, {
    messages: [],
    isLoading: false,
  })

  const fetchMessages = useCallback(async () => {
    const messages = await listMessages(params.threadId)
    messages.forEach(message => dispatch({ type: 'ADD_MESSAGE', message }))
  }, [params.threadId])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  async function handleSubmit(input: string) {
    const userMessage: Message = {
      content: input,
      role: 'user',
    }
    dispatch({ type: 'ADD_MESSAGE', message: userMessage })
    dispatch({ type: 'SET_LOADING', isLoading: true })

    await createMessage(params.threadId, userMessage)
    const stream = await runThread(params.threadId, params.assistantId)

    dispatch({ type: 'ADD_MESSAGE', message: { role: 'assistant', content: '_질문답변 사항 생성 중..._' } })
    for await (const v of readStreamableValue(stream)) {
      if (v && v.text !== '') {
        dispatch({ type: 'UPDATE_LAST_MESSAGE', content: v.text })
      }
    }
    dispatch({ type: 'SET_LOADING', isLoading: false })
  }

  return (
    <div className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
      <Chat messages={state.messages} handleSubmit={handleSubmit} isLoading={state.isLoading} />
    </div>
  )
}
