import { Command } from 'cmdk'
import { useEffect, useRef, useState } from 'react'
import './OmniSearch.css'
import { SearchIcon } from '.'
import { useOmniSearch } from '../state'
import { OmniSearchResults } from '.'

const OmniSearch = () => {
  const [open, setOpen] = useState(false)
  const { omniSearch, handleSubmit, handleSearch, handleSearchSelect } =
    useOmniSearch({})
  const omniSearchAnchor = useRef(undefined)

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <Command.Dialog
        container={omniSearchAnchor.current}
        className='os-dialog'
        open={open}
        onOpenChange={setOpen}
        label='Global Command Menu'
      >
        <div
          className='os-input'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <SearchIcon />
          <form onSubmit={handleSubmit}>
            <Command.Input
              value={omniSearch.search}
              className='os-input'
              onValueChange={handleSearch}
            />
          </form>
        </div>
        <OmniSearchResults onClick={() => setOpen(!open)} />
      </Command.Dialog>
      <div ref={omniSearchAnchor} />
    </>
  )
}

export default OmniSearch
