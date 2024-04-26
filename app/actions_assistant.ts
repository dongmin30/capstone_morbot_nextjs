'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'

import { auth } from '@/auth'
import { type Assistant } from '@/lib/types'

export async function getAssistants(userId?: string | null) {
  if (!userId) {
    return []
  }

  try {
    const pipeline = kv.pipeline()
    const assistants: string[] = await kv.zrange(`user:assistant:${userId}`, 0, -1, {
      rev: true
    })

    for (const assistant of assistants) {
      pipeline.hgetall(assistant)
    }

    const results = await pipeline.exec()

    return results as Assistant[]
  } catch (error) {
    return []
  }
}

export async function getAssistant(id: string, userId: string) {
  const assistant = await kv.hgetall<Assistant>(`assistant:${id}`)

  if (!assistant || (userId && assistant.userId !== userId)) {
    return null
  }

  return assistant
}

export async function removeAssistant({ id, path }: { id: string; path: string }) {
  const session = await auth()

  if (!session) {
    return {
      error: '연동 실패'
    }
  }

  //Convert uid to string for consistent comparison with session.user.id
  const uid = String(await kv.hget(`assistant:${id}`, 'userId'))

  if (uid !== session?.user?.id) {
    return {
      error: '연동 실패'
    }
  }

  await kv.del(`assistant:${id}`)
  await kv.zrem(`user:assistant:${session.user.id}`, `assistant:${id}`)

  revalidatePath('/')
  return revalidatePath(path)
}

export async function getSharedAssistant(id: string) {
  const assistant = await kv.hgetall<Assistant>(`assistant:${id}`)

  if (!assistant || !assistant.sharePath) {
    return null
  }

  return assistant
}

export async function shareAssistant(id: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: '연동 실패'
    }
  }

  const assistant = await kv.hgetall<Assistant>(`assistant:${id}`)

  if (!assistant || assistant.userId !== session.user.id) {
    return {
      error: '문제가 발생하였습니다.'
    }
  }

  const payload = {
    ...assistant,
    sharePath: `/share/${assistant.id}`
  }

  await kv.hmset(`assistant:${assistant.id}`, payload)

  return payload
}

export async function saveAssistant(assistant: Assistant) {
  const session = await auth()

  if (session && session.user) {
    const pipeline = kv.pipeline()
    pipeline.hmset(`assistant:${assistant.id}`, assistant)
    pipeline.zadd(`user:assistant:${assistant.userId}`, {
      score: Date.now(),
      member: `assistant:${assistant.id}`
    })
    await pipeline.exec()
  } else {
    return
  }
}

export async function refreshAssistantHistory(path: string) {
  redirect(path)
}

export async function getMissingKeys() {
  const keysRequired = ['OPENAI_API_KEY']
  return keysRequired
    .map(key => (process.env[key] ? '' : key))
    .filter(key => key !== '')
}