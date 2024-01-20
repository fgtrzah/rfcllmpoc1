import { OAIAUTHSECRET, RFCLLMEP } from 'src/config'
import { useEffect, useState } from 'react'
import { useStore } from 'src/state'
import { hashCode } from 'src/utils'

const useOmniChat = () => {
  const [store, dispatch] = useStore()
  const { omniChat, auth } = store
  const [loading, setLoading] = useState(false)

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
      await fetch(`http://localhost:8000/qa/single/contigious`, requestOptions)
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

  useEffect(() => {}, [omniChat])

  return {
    omniChat,
    handleSend,
    loading,
  }
}

export default useOmniChat
