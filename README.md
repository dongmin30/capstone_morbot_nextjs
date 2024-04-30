<a href="https://chat.vercel.ai/">
  <img alt="Next.js 14 and App Router-ready AI chatbot." src="https://chat.vercel.ai/opengraph-image.png">
  <h1 align="center">Next.js AI 챗봇 모르봇</h1>
</a>

<p align="center">
  Vercel AI SDK와 NextJs 및 Vercel KV로 구축한 AI 챗봇 모르봇입니다.
</p>
<br/>

## 특징

- [Next.js](https://nextjs.org) 앱 라우터
- [Vercel AI SDK](https://sdk.vercel.ai/docs) 채팅 스트리밍 UI
- [shadcn/ui](https://ui.shadcn.com)
  - 스타일 적용 방식 [Tailwind CSS](https://tailwindcss.com)
  - [Radix UI](https://radix-ui.com) 헤드리스 구성요소 UI
  - 아이콘 출처 [Phosphor Icons](https://phosphoricons.com)
- 채팅 기록, 속도 제한 및 세션 저장 [Vercel KV](https://vercel.com/storage/kv)
- [NextAuth.js](https://github.com/nextauthjs/next-auth) NextAuth 인증
- GPT-4-turbo의 어시스턴트 파일 검색 기능

## 사용하는 모델

해당 템플릿은 'gpt-3.5-turbo'를 기본 값으로 사용하며 어시스턴트 파일 검색 기능 사용을 위해 'gpt-4-turbo' 모델도 사용합니다. [Vercel AI SDK](https://sdk.vercel.ai/docs)

## KV 데이터베이스 인스턴스 생성

아래 링크에 설명된 단계를 실행합니다. [quick start guide](https://vercel.com/docs/storage/vercel-kv/quickstart#create-a-kv-database) 해당 가이드는 Vercel에서 KV 데이터베이스 인스턴스를 생성 및 구성하여 애플리케이션이 상호 작용할 수 있도록 지원합니다.

환경 변수를 업데이트를 구동하실 때 기억해두어야합니다. (`KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`) KV 데이터베이스 설정 중에 제공된 자격 증명을 기록하여 `.env` 파일에 저장합니다.

## 로컬에서 실행

Next.js AI Morbot을 실행하려면 [`.env.example`에 정의된](.env.example) 환경 변수를 사용해야 합니다. 이를 위해서는 [Vercel 환경 변수](https://vercel.com/docs/projects/environment-variables)를 빌드 배포 시 사용하는 방법도 있지만 로컬에서는 `.env` 파일로 구동할 수 있습니다.

> 참고: `.env` 파일을 커밋하면 안 됩니다. 그렇지 않으면 다른 사람이 다양한 OpenAI 및 인증 공급자 계정에 대한 액세스를 제어할 수 있는 비밀이 노출됩니다.

1. Vercel CLI 설치: `npm i -g vercel`
2. Vercel 및 GitHub 계정과 로컬 인스턴스 연결 (`.vercel` 디렉토리 생성): `vercel link`
3. 환경 변수 다운로드: `vercel env pull`

```bash
pnpm install
pnpm dev
```

이제 앱 템플릿이 다음에서 실행되어야 합니다. [localhost:3000](http://localhost:3000/).

## 템플릿 출처

이 라이브러리는 [Vercel](https://vercel.com) 및 [Next.js](https://nextjs.org) 팀원이 만들었으며, 아래 인원이 기여하였습니다:

- Jared Palmer ([@jaredpalmer](https://twitter.com/jaredpalmer)) - [Vercel](https://vercel.com)
- Shu Ding ([@shuding\_](https://twitter.com/shuding_)) - [Vercel](https://vercel.com)
- shadcn ([@shadcn](https://twitter.com/shadcn)) - [Vercel](https://vercel.com)
