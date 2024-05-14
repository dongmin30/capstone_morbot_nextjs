'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle } from 'lucide-react'
import { attachFiles, createAssistant, createFile, createThread, createVectorStore } from '@/lib/assistant/actions_temp'
import { useToast } from '@/lib/hooks/use-toast'
import Dropzone from '@/components/dropzone'

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleFilesLoaded(files: FileList) {
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
      const assistant = await createAssistant(vectorStore.id)
      // 스레드 생성
      const thread = await createThread()
      // 적용된 대화창으로 이동
      router.push(`/assistant/${assistant.id}/thread/${thread.id}`)
    } catch (error) {
      setIsLoading(false)
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem creating your assistant.',
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
            <Dropzone onLoad={handleFilesLoaded} />
          </>
        )}
      </div>
    </div>
  )
}