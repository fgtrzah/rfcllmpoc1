import { OAIAUTHSECRET, RFCAPIEP } from 'src/config'
import { FormEvent, useCallback, useEffect, useState } from 'react'
import { useStore, useOctokitService } from 'src/state'
import { hashCode } from 'src/utils'

const useOmniChat = () => {
  const [store, dispatch] = useStore()
  const { omniChat } = store
  const auth = useOctokitService() as any
  const [loading, setLoading] = useState(false)

  // future state
  const { messages, input } = omniChat

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      ...store,
      omniChat: {
        ...store.omniChat,
        input: e.target.value,
      },
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    /*
     * - extract query
     * - append query to messages
     * - copy remainder of api call
     *   delegation
     */
    let q = e?.target?.query?.value
    dispatch({
      ...store,
      omniChat: {
        ...store.omniChat,
        messages: [
          ...messages,
          {
            role: 'user',
            message: q,
          },
        ],
      },
    })
    console.log(q)
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

  const handleSend = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('x-access-token', OAIAUTHSECRET || '')
    headers.append('Authorization', `Bearer ${auth.access_token}`)

    let requestOptions: any = {
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
      }),
      redirect: 'follow',
    }
    requestOptions.headers.append('X-Ray-Id', hashCode(requestOptions))
    let res = await (
      await fetch(`${RFCAPIEP}/qa/single/contigious`, requestOptions)
    ).json()

    dispatch({
      ...store,
      omniChat: {
        ...store.omniChat,
        completions: [res],
      },
    })
    setLoading(false)
  }

  useEffect(() => {
    console.log(messages)
  }, [messages])

  return {
    omniChat,
    handleSend,
    loading,
    toggleQA,

    // future state
    messages,
    input,
    handleInputChange,
    handleSubmit,
  }
}

export default useOmniChat
