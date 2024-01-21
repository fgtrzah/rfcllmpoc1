import { createStateContext } from 'react-use'
import useOmniSearch from './useOmniSearch'
import useRFCTree from './useRFCTree'
import useOmniChat from './useOmniChat'
import useForm from './useForm'
import useDebounce from './useDebounce'
import useSearch from './useSearch'
import useAbortableStreamFetch from './useAbortableStreamFetch'
import { RFCDOCTREE } from 'src/config'
import useAuth from './useAuth'
import useQAVisibility from './useQAVisibility'

export type SearchChannel = 'Group' | 'Affiliation' | 'RFC' | string
export type SearchResult = string[] | any
export type Store = {
  auth: {
    [x: string]: any
  }
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
    active?: boolean,
    scopes?: string[] | unknown,
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
    filter: {},
  },
  search: {
    resultsById: {},
    ids: [],
    loading: false,
    channels: ['RFC', 'Group'],
  },
  omniChat: {
    byCompletionId: {},
    completions: [],
    rfcThreadLinks: {},
  },
  rfcDocumentTree: {
    defaults: RFCDOCTREE,
  },
  rfcDocumentDetail: {},
  settings: {},
  auth: {},
}

const [useStore, SharedStoreProvider] = createStateContext<Store>(defaultState)

export {
  useAuth,
  useSearch,
  useDebounce,
  useForm,
  useOmniChat,
  useOmniSearch,
  useRFCTree,
  useStore,
  useAbortableStreamFetch,
  SharedStoreProvider,
  useQAVisibility,
}
