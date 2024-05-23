'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle } from 'lucide-react'
import { attachFiles, createAssistant, createFile, createThread, createVectorStore } from '@/lib/assistant/actions'
import { useToast } from '@/lib/hooks/use-toast'
import { type Assistant } from '@/lib/types'
import Dropzone from '@/components/dropzone'
import { saveAssistant } from '@/app/actions_assistant'

import { Session } from '@/lib/types'

export interface AssistantHandlerProps extends React.ComponentProps<'div'> {
  session?: Session
}

export function AssistantHandler({session} : AssistantHandlerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [assistantName, setAssistantName] = useState('')
  const router = useRouter()
  const { toast } = useToast()

  async function handleFilesLoaded(files: FileList) {
    if (!assistantName) {
      toast({
        variant: 'destructive',
        title: '이름이 필요합니다.',
        description: '어시스턴트 이름을 입력해주세요.',
      });
      return;
    }

    setIsLoading(true)

    try {
      const fileList = await uploadFiles(files)
      // 벡터 스토어 생성
      const vectorStore = await createVectorStore()
      await attachFiles(
        vectorStore.id,
        fileList.map(file => file.id),
      )
      
      // 어시스턴트 생성 후 벡터 스토어 아이디 부여
      const assistant = await createAssistant(vectorStore.id, assistantName)
      
      // 스레드 생성
      const thread = await createThread()

      if (session && session.user) {
        const createdAt = new Date()
        const userId = session.user.id as string
        const path = `/assistant/${assistant.id}/thread/${thread.id}`

        const assistantData: Assistant = {
          id: thread.id,
          assistantId: assistant.id,
          title: assistantName,
          userId: userId,
          createdAt: createdAt,
          path: path
        }

        await saveAssistant(assistantData);
      }

      // 적용된 대화창으로 이동
      router.push(`/assistant/${assistant.id}/thread/${thread.id}`)
      
    } catch (error) {
      setIsLoading(false)
      toast({
        variant: 'destructive',
        title: '문제가 발생했습니다.',
        description: '어시스턴트 생성에 문제가 발생하였습니다.',
      })
    }
  }

  async function uploadFiles(files: FileList) {
    return await Promise.all(
      Array.from(files).map(file => {
        const formData = new FormData()
        formData.append('file', file)
        return createFile(formData)
      }),
    )
  }

  return (
    <div className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
      <div className="p-6 text-gray-700 dark:text-white">
        {isLoading ? (
          <LoaderCircle className="size-24 animate-spin" />
        ) : (
          <>
            <div className="flex items-center justify-center">
              <input
                type="text"
                value={assistantName}
                onChange={(e) => setAssistantName(e.target.value)}
                placeholder="어시스턴트 이름을 입력하세요"
                className={`mx-auto mb-4 flex w-full max-w-lg p-5 rounded-xl border-2 text-center}`}
              />
            </div>
            {assistantName && <Dropzone onLoad={handleFilesLoaded} />}
          </>
        )}
      </div>
    </div>
  );
}