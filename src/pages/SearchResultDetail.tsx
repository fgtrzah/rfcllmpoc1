import { OAIAUTHSECRET, RFCAPIEP, RFCAPIEPTOKEN } from 'src/config'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SearchResultDetail = (props: React.PropsWithChildren) => {
  const { rfcid } = useParams()
  const [doc, setDocument] = useState<string>('')

  useEffect(() => {
    let mounted = true

    if (!mounted) return

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('x-access-token', OAIAUTHSECRET || '')
    headers.append('Authorization', `Bearer ${RFCAPIEPTOKEN}`)
    const cleansedID = rfcid.slice(3)

    fetch(`${RFCAPIEP}/search/rfc`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: (rfcid.slice(0, 3) + cleansedID.trimStart())?.toLowerCase(),
      }),
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((result) => setDocument(result?.data?.attributes?.result))
      .catch((error) => console.log('error', error))

    return () => {
      mounted = false
    }
  }, [rfcid])

  return (
    <div style={{ display: 'flex', paddingTop: 20 }}>
      <pre style={{ fontSize: 8, lineHeight: 1.2, paddingRight: 20 }}>
        {doc}
      </pre>
      <div style={{ overflow: 'auto', flexBasis: '50%' }}>{props.children}</div>
    </div>
  )
}

export default SearchResultDetail
