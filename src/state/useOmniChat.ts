import { OAIAUTHSECRET, RFCAPIEP } from 'src/config'
import { useState } from 'react'
import { useStore, useAuthService } from 'src/state'
import { hashCode } from 'src/utils'
export interface UseOmniChatProps {
  modelid?: 'gpt' | 'llama2' | 'mistral' | string
  [x: string]: any
}
const useOmniChat = (opts: UseOmniChatProps) => {
  const [store, dispatch] = useStore()
  const { omniChat } = store
  const { data } = useAuthService({
    onSuccess: (d) => console.log(d),
    onError: (d) => console.log(d),
  }) as any
  const [loading, setLoading] = useState(false)

  // future state
  const { messages, input, llmChannel } = omniChat

  const handleLLMChannelChange = (e) =>
    console.log(llmChannel.channels[e.target.value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      ...store,
      omniChat: {
        ...store.omniChat,
        input: e.target.value,
      },
    })
  }

  const toggleQAPanel = () => {
    dispatch({
      ...store,
      omniChatPanel: {
        ...store.omniChatPanel,
        active: !store.omniChatPanel.active,
      },
      omniChat: {
        ...store.omniChat,
        active: !store.omniChat.active,
      },
    })
  }

  // current state
  const toggleQA = () => {
    dispatch({
      ...store,
      omniChat: {
        ...store.omniChat,
        active: !store.omniChat.active,
      },
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    const q = e.target.query.value

    // sync user message
    const um = {
      choices: [
        {
          message: {
            content: q,
            role: 'user',
          },
        },
      ],
    }

    dispatch({
      ...store,
      omniChat: {
        ...store.omniChat,
        completions: [...store?.omniChat?.completions, um],
      },
    })

    // retrieve + sync system message
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('x-access-token', OAIAUTHSECRET || '')
    headers.append('Authorization', `Bearer ${data.access_token}`)

    const requestOptions: any = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: e.target.query.value,
        context: `https://www.rfc-editor.org/rfc/${decodeURIComponent(
          window.location.pathname,
        )
          .replace(/\s+/g, '')
          .split('/')
          .pop()
          ?.toLowerCase()
          ?.replace(' ', '')}.txt`,
        invocation_style: 'SINGLE',
        invocation_filter: opts?.modelid,
      }),
      redirect: 'follow',
    }
    requestOptions.headers.append('X-Ray-Id', hashCode(requestOptions))
    let sm = (
      await (
        await fetch(`${RFCAPIEP}/qa/single/contigious`, requestOptions)
      ).json()
    )?.data?.attributes

    if (sm?.completions?.model?.includes?.('mistral')) {
      sm.completions.choices[0].message = {}
      sm.completions.choices[0].message.role = 'assistant'
      sm.completions.choices[0].message.content =
        sm.completions.choices[0].message.content ||
        sm.completions.choices[0].text
    }

    dispatch({
      ...store,
      omniChat: {
        ...store.omniChat,
        completions: [...store.omniChat.completions, sm?.completions],
      },
    })
    setLoading(false)
  }

  return {
    omniChat,
    loading,
    toggleQA,
    toggleQAPanel,
    messages,
    input,
    handleChange,
    handleSubmit,
  }
}

export default useOmniChat
