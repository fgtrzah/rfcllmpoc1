import { useStore } from '.'

interface UseOmniSearchOptions {
  [x: string]: any
}

const useOmniSearch = (_: UseOmniSearchOptions) => {
  const [store, dispatch] = useStore()
  const omniSearch = store.omniSearch

  const handleSearch = (v: React.ChangeEvent<HTMLInputElement> | string) => {
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
  }

  return {
    omniSearch,
    handleFilter,
    handleSearch,
    handleSubmit,
  }
}

export default useOmniSearch
