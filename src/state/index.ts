import { createStateContext } from 'react-use'
import useOmniSearch from './useOmniSearch'
import useRFCTree from './useRFCTree'
import useOmniChat from './useOmniChat'
import useForm from './useForm'
import useDebounce from './useDebounce'
import useSearch from './useSearch'
import useAbortableStreamFetch from './useAbortableStreamFetch'
import { RFCDOCTREE } from 'src/config'
import useQAVisibility from './useQAVisibility'
import {
  OctokitProvider,
  useOctokit,
  useGithub,
  useOctokitService,
} from './useOctokit'

export type SearchChannel = 'Group' | 'Affiliation' | 'RFC' | string
export type SearchResult = string[] | any
export type Message = {
  role?: 'system' | 'user'
  message?: string
  [x: string]: any
}
export type Store = {
  omniSearch: {
    scopes?: string[]
    search?: string
    filter?: {
      [x: string]: any
    }
    [x: string]: any
  }
  search: {
    resultsById: {
      [x: string]: SearchResult
    }
    ids: string[]
    loading: boolean
    channels: SearchChannel[]
    [x: string]: any
  }
  omniChat: {
    active?: boolean
    scopes?: string[] | unknown
    messages?: (Message | unknown)[]
    input?: string | unknown
    [x: string]: any
  }
  rfcDocumentTree: {
    defaults: any[]
    [x: string]: any
  }
  rfcDocumentDetail: {
    [x: string]: any
  }
  settings: {
    [x: string]: any
  }
}

export const defaultState: Store = {
  omniSearch: {
    scopes: ['recents', 'bookmarked', 'global', 'tags'],
    search: '',
    active: false,
    filter: {},
  },
  search: {
    resultsById: {},
    ids: [],
    loading: false,
    channels: ['RFC', 'Group'],
  },
  omniChat: {
    active: false,
    scopes: window.location.pathname,
    byCompletionId: {},
    completions: [],
    rfcThreadLinks: {},
  },
  rfcDocumentTree: {
    defaults: RFCDOCTREE,
  },
  rfcDocumentDetail: {},
  settings: {},
}

const [useStore, SharedStoreProvider] = createStateContext<Store>(defaultState)

export {
  useOctokit,
  useOctokitService,
  useSearch,
  useDebounce,
  useForm,
  useOmniChat,
  useOmniSearch,
  useRFCTree,
  useStore,
  useAbortableStreamFetch,
  SharedStoreProvider,
  OctokitProvider,
  useQAVisibility,
}
