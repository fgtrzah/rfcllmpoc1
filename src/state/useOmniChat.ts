import { OAIAUTHSECRET, RFCLLMEP } from 'src/config'
import { useState } from 'react'
import { useStore } from 'src/state'
import { hashCode } from 'src/utils'

const useOmniChat = () => {
  const [store, dispatch] = useStore()
  const { omniChat } = store
  const [loading, setLoading] = useState(false)

  const handleSend = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('x-access-token', OAIAUTHSECRET || '')

    let requestOptions: any = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: e.target.query.value,
        context: `https://www.rfc-editor.org/rfc/${window.location.pathname
          .split('/')
          .pop()
          ?.toLowerCase()}.txt`,
      }),
      redirect: 'follow',
    }
    requestOptions.headers.append('X-Ray-Id', hashCode(requestOptions))

    let res = await (
      await fetch(`${RFCLLMEP}/qa/single/contigious`, requestOptions)
    ).json()

    if (!import.meta.env.PROD) {
      res = {
        completion: {
          id: 'chatcmpl-8ZozoXzN7cyKH10b2cipaaDA0U0cB',
          choices: [
            {
              finish_reason: 'stop',
              index: 0,
              logprobs: null,
              message: {
                content:
                  'The title of RFC 3034 is "Use of Label Switching on Frame Relay Networks Specification". This is found in the provided document information:\n\n```\ntitle=\' Use of Label Switching on Frame Relay Networks Specification \'\n```',
                role: 'assistant',
                function_call: null,
                tool_calls: null,
              },
            },
          ],
          created: 1703548200,
          model: 'gpt-4-1106-preview',
          object: 'chat.completion',
          system_fingerprint: 'fp_3905aa4f79',
          usage: {
            completion_tokens: 45,
            prompt_tokens: 12172,
            total_tokens: 12217,
          },
        },
        results: [
          {
            id: 'chatcmpl-8ZozoXzN7cyKH10b2cipaaDA0U0cB',
            choices: [
              {
                finish_reason: 'stop',
                index: 0,
                logprobs: null,
                message: {
                  content:
                    'The title of RFC 3034 is "Use of Label Switching on Frame Relay Networks Specification". This is found in the provided document information:\n\n```\ntitle=\' Use of Label Switching on Frame Relay Networks Specification \'\n```',
                  role: 'assistant',
                  function_call: null,
                  tool_calls: null,
                },
              },
            ],
            created: 1703548200,
            model: 'gpt-4-1106-preview',
            object: 'chat.completion',
            system_fingerprint: 'fp_3905aa4f79',
            usage: {
              completion_tokens: 45,
              prompt_tokens: 12172,
              total_tokens: 12217,
            },
          },
        ],
        query: 'what is the title of rfc 3034?',
        context: 'https://www.rfc-editor.org/rfc/rfc3034.txt',
        current_user: {
          username: 'johndoe',
          email: 'johndoe@example.com',
          full_name: 'John Doe',
          disabled: false,
          hashed_password:
            '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
        },
      }
    }

    dispatch({
      ...store,
      omniChat: {
        ...store.omniChat,
        completions: [res],
      },
    })
    setLoading(false)
  }

  return {
    omniChat,
    handleSend,
    loading,
  }
}

export default useOmniChat
