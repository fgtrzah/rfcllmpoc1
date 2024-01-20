import React, { useEffect } from 'react'
import './OmniChat.css'
import useQAVisibility from 'src/state/useQAVisibility'
import { useChat } from 'ai/react'
import { OpenAI } from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { OAIAUTHSECRET } from 'src/config'
import { useForm, useOmniChat } from 'src/state'

export interface OmniChatProps extends React.PropsWithChildren {
  [x: string]: unknown
}
console.log(import.meta.env.REACT_APP_OAIAUTHSECRET)
export const runtime = 'edge'
const openai = new OpenAI({
  apiKey: OAIAUTHSECRET,
  dangerouslyAllowBrowser: true,
})

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json()
  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    stream: true,
    messages: messages,
    max_tokens: 218,
    temperature: 0.1,
    top_p: 1,
  })
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}

const OmniChat = (props: OmniChatProps) => {
  const { active, scopes } = useQAVisibility({
    active: true,
    scopes: window.location.pathname,
  })
  const { omniChat: omniChatStore, loading, handleSend } = useOmniChat()
  const { data, handleChange, handleSubmit, errors } = useForm<any>({
    validations: {
      name: {
        pattern: {
          value: '^[A-Za-z]*$',
          message: 'Error...',
        },
      },
    },
    onSubmit: handleSend,
  })
  useEffect(() => {
    console.log(omniChatStore)
  }, [omniChatStore])

  if (!active) return null

  return (
    <div className='oc-container'>
      <header className='oc-header'>QA Context: {scopes}</header>
      <main className='oc-content'>
        {omniChatStore.completions[0]?.completion?.choices?.map(
          (m: any, mi: number) => {
            return (
              <>
                <span key={mi}>
                  <strong>{m.message.role.toUpperCase()}:</strong>
                  {m.message.content}
                </span>
              </>
            )
          },
        )}
      </main>
      <section>{props?.children}</section>
      <footer className='oc-footer'>
        <form onSubmit={handleSubmit}>
          <input
            disabled={loading}
            style={{ width: 400, background: 'none' }}
            value={omniChatStore.search}
            name='query'
            placeholder='Describe your business...'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value)
            }
          />
        </form>
      </footer>
    </div>
  )
}

export default OmniChat
