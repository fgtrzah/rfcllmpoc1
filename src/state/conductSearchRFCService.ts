import { OAIAUTHSECRET, RFCAPIEP } from 'src/config'

export interface RFCServiceSearchOptions {
  [x: string]: any
}

export default async function conductSearchRFCService(
  opts: RFCServiceSearchOptions,
) {
  let headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('x-access-token', OAIAUTHSECRET || '')

  try {
    const result = await (
      await fetch(`${RFCAPIEP}/search/query/ietf`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ query: opts.query }),
      })
    ).json()
    return result
  } catch (error) {
    console.error(error)
    return error
  }
}
