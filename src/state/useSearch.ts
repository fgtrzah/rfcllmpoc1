import React, { useEffect, useState } from 'react'
import { useDebounce, useOmniSearch, useStore } from './'
import conductSearchRFCService from './conductSearchRFCService'

const useSearch = () => {
  const [store, dispatch] = useStore()
  const search = store.search
  const loading = search.loading
  const { omniSearch } = useOmniSearch({})
  const debounced = useDebounce(omniSearch.search, 600)

  useEffect(() => {
    const searchRFCService = async () => {
      let results = []

      dispatch({
        ...store,
        search: {
          ...store.search,
          loading: true,
        },
      })

      if (debounced) {
        results =
          (await conductSearchRFCService({
            query: debounced,
          })) || []
      }

      dispatch({
        ...store,
        search: {
          ...store.search,
          resultsById: results,
          ids: Object.keys(results),
          loading: false,
        },
      })
    }

    searchRFCService()
  }, [debounced])

  return {
    search,
    debounced,
    loading,
  }
}

export default useSearch
