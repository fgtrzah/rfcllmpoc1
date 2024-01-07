import { OAIAUTHSECRET, RFCLLMEP } from 'src/config'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SearchResultDetail = (props: React.PropsWithChildren & any) => {
  const { rfcid } = useParams()
  const [doc, setDocument] = useState<any>('')

  useEffect(() => {
    let mounted = true

    if (!mounted) return

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('x-access-token', OAIAUTHSECRET || '')
    headers.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huZG9lIiwiZXhwIjoxNzA0NjA2MDkzfQ.bYdoxLNyIdJCjmC3T8Ndz8HrkqNVx0KHH2gE4eVPUUM',
    )

    let cleansedID = rfcid.slice(3)

    let raw = JSON.stringify({
      query: (rfcid.slice(0, 3) + cleansedID.trimStart())?.toLowerCase(),
    })

    let requestOptions: any = {
      method: 'POST',
      headers,
      body: raw,
      redirect: 'follow',
    }

    fetch(`http://127.0.0.1:8000/search/rfc`, requestOptions)
      .then((response) => response.json())
      .then((result) => setDocument(result.result))
      .catch((error) => console.log('error', error))

    return () => {
      mounted = false
    }
  }, [rfcid])

  useEffect(() => {
    console.log(doc)
  }, [doc])

  return (
    <div style={{ display: 'flex', paddingTop: 20 }}>
      <pre style={{ fontSize: 8, lineHeight: 1.2, paddingRight: 20 }}>
        {doc || null}
      </pre>
      <div style={{ overflow: 'auto', flexBasis: '50%' }}>{props.children}</div>
    </div>
  )
}

export default SearchResultDetail
