/* eslint-disable @typescript-eslint/no-explicit-any */
/*
  Author: https://github.com/TimMikeladze/use-octokit
 
  Why did I put this here?

    TLDR: the interest of time and moderation/security training 
    wheels are the biggest factors

    Preventative measure / accountability, if any violation
    of moderation rules or eula transpire, then the wrath 
    will ideally not fall on this project's head. Would use a KV store
    library + diff-privacy / ssr / obfuscating obfuscations.
    really anything to bolster baseline safety. RFCs are really 
    fascinating and consuming them + enlightening oneself should
    be possible without compromising non-negotiables. 
    This is the shortest path to ensure names to activity
    for data-takeout down the road, for revisiting chat history
    for a plethora of problems that haven't been unearthed yet
    safety and harmony are the reason I felt like there should 
    at least be a link between a list of genai api discourse and
    something idempotent and common like github accounts. 
    Def not suitable for scaled communities of 1000s of users
    reading RFCs and QA'ing or semantic searching in swaths.

    Additionally, didn't feel fully sold on needing to reach for
    swr and maybe even octokit, but didn't want to dwell because
    other parts of the system are eagerly waiting to be polished.

  
    Also my initial approach was far more jank sadly, this hook compelled
    me to gut what I had right away.

    - fgtrz - 02.09.2024
 
  Very straight forward architecture imo:
    - swr for state machine
    - octokit for GitHub API
    - context
    - fetch
    - provider
    - react land
    - opportunity for sdl/codegen using 
      OpenAPI spec for GitHub REST API
*/
import { Octokit as OctokitClient } from '@octokit/rest'
import React, { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods'
import { deOnion } from 'src/utils'
import {
  VITE_REACT_APP_GHOKPAT,
  VITE_REACT_APP_AUTH_EP,
  VITE_REACT_APP_AUTH_CID,
  VITE_REACT_APP_RFCAPIEP,
} from 'src/config'
import { useLocation } from 'react-router'
import { useStore } from '.'

type OctokitContextInterface = {
  auth: any
  octokit?: OctokitClient
}

const OctokitContext = React.createContext<OctokitContextInterface | undefined>(
  undefined,
)

type OctokitProps = {
  auth: any
  children: React.ReactNode
  octokit?: OctokitClient
}

const fetcher = async ([endpoint, action, args, auth, client]: [
  string,
  string,
  any,
  any,
  OctokitClient | undefined,
]) => {
  const octokit = (client ||
    new OctokitClient({
      auth,
    })) as OctokitClient

  if (!auth && !octokit) {
    throw new Error(
      `useOctokit must be used within a OctokitProvider or have the 4th argument of this function set to an object with an auth or octokit property`,
    )
  }

  const fn = (octokit.rest as any)?.[endpoint]?.[action]

  if (!fn) {
    throw new Error(`Octokit method ${endpoint}.${action} not found`)
  }

  const res = await fn(args)

  return res.data
}

export const useOctokit = <
  Endpoint extends keyof RestEndpointMethodTypes,
  Action extends keyof RestEndpointMethodTypes[Endpoint],
  Args extends keyof RestEndpointMethodTypes[Endpoint][Action],
  Output = RestEndpointMethodTypes[Endpoint][Action][any][any],
>(
  endpoint: Endpoint | null,
  action?: Action,
  args?: RestEndpointMethodTypes[Endpoint][Action][Args],
  options?: Partial<Pick<OctokitProps, 'auth' | 'octokit'>>,
  swr?: Parameters<typeof useSWR>[2],
) => {
  const context = React.useContext<OctokitContextInterface | undefined>(
    OctokitContext,
  )
  const auth = options?.auth || context?.auth
  const octokit = options?.octokit || context?.octokit
  const hasAuth = auth || octokit
  const res = useSWR(
    hasAuth && endpoint && action
      ? [endpoint, action, args, auth, octokit]
      : null,
    fetcher,
    swr,
  )

  return {
    ...res,
    data: res.data as Output,
  }
}

export const OctokitProvider = (props: OctokitProps) => {
  const value = useMemo(
    () => ({
      auth: props.auth,
      octokit: props.octokit,
    }),
    [props.auth, props.octokit],
  )

  return (
    <OctokitContext.Provider value={value}>
      {props.children}
    </OctokitContext.Provider>
  )
}

const useOctokitService = <T extends any>() => {
  const location = useLocation()
  const user = useOctokit('users', 'getAuthenticated', undefined, {})
  const [access_token, setAT] = useState<any>(
    new URLSearchParams(location.search || '')?.get?.('code'),
  )
  const login = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=Iv1.732c40d755888833&redirect_uri=https://127.0.0.1:8080/auth/callback`
  }

  useEffect(() => {
    if (!user && login && typeof login === 'function') login()
    if (user) console.log(user)
  }, [user])

  useEffect(() => {
    if (location.search.includes('code')) {
      const getUserProfile = () => {
        window.location.href = `https://127.0.0.1:8080/auth/callback?${location.search}`
      }

      setAT(new URLSearchParams(location.search).get('code'))

      getUserProfile()
    }
  }, [location.search])

  useEffect(() => {
    console.log(location.state)
  }, [location.state])

  return {
    user,
    login,
    access_token,
  }
}

export {
  useOctokitService,
  OctokitProvider as GithubProvider,
  useOctokit as useGithub,
}
