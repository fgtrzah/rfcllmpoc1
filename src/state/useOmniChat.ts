import { OAIAUTHSECRET, RFCLLMEP, RFCAPIEP } from 'src/config'
import { useCallback, useEffect, useState } from 'react'
import { useStore } from 'src/state'
import { hashCode } from 'src/utils'
import { useSocket } from './useSocket'

const useOmniChat = () => {
  const [store, dispatch] = useStore()
  const { omniChat, auth } = store
  const [loading, setLoading] = useState(false)
  const socket = useSocket()

  const handleMessage = useCallback((m) => {
    console.log(m)
  }, [])

  const toggleQA = () => {
    dispatch({
      ...store,
      omniChat: {
        ...omniChat,
        active: !omniChat.active,
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
    socket.send(JSON.stringify(requestOptions))
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
    socket.addEventListener('message', handleMessage)
    return () => {
      socket.removeEventListener('message', handleMessage)
    }
  }, [socket, handleMessage])

  useEffect(() => {
    if (window.location.hash.includes('qa')) {
      dispatch({
        ...store,
        omniChat: {
          ...store.omniChat,
          active: window.location.hash.includes('qa'),
        },
      })
    }
  }, [window.location.hash])

  return {
    omniChat,
    handleSend,
    loading,
    toggleQA,
  }
}

export default useOmniChat
