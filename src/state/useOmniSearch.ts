import { useStore } from '.'

interface UseOmniSearchOptions {
  [x: string]: any
}

const useOmniSearch = (_: UseOmniSearchOptions) => {
  const [store, dispatch] = useStore()
  const omniSearch = store.omniSearch

  const handleSearchSelect = () => {
    dispatch({
      ...store,
      omniSearch: {
        ...store.omniSearch,
        active: false,
      },
    })
  }

  const handleSearch = (v: any) => {
    dispatch({
      ...store,
      omniSearch: {
        ...store.omniSearch,
        search: typeof v === 'string' ? v : v?.target?.value,
      },
    })
  }

  const handleFilter = (v: any) => {
    dispatch({
      ...store,
      omniSearch: {
        ...store.omniSearch,
        filter: typeof v === 'string' ? v : v?.target?.value,
      },
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const formData: any = new FormData(e.target)
    dispatch({
      ...store,
      omniSearch: {
        ...store.omniSearch,
        search: formData.get('search'),
      },
    })
    handleSearchSelect()
  }

  return {
    omniSearch,
    handleFilter,
    handleSearch,
    handleSubmit,
    handleSearchSelect,
  }
}

export default useOmniSearch
