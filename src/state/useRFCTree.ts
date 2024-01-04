import { Store, useStore } from '.'

const useRFCTree = (_: Store['rfcDocumentTree'] | any = []) => {
  const [store] = useStore()
  const rfcDocumentTree = store.rfcDocumentTree

  return {
    rfcDocumentTree,
  }
}

export default useRFCTree
