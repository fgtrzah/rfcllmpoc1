import { Command } from 'cmdk'
import { useEffect, useRef, useState } from 'react'
import './OmniSearch.css'
import { SearchIcon } from '.'
import { useOmniSearch } from '../state'

const OmniSearch = () => {
  const [open, setOpen] = useState(false)
  const { omniSearch, handleSubmit, handleSearch } = useOmniSearch({})
  const omniSearchAnchor = useRef<any>(undefined)

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

  useEffect(() => {
    console.log(omniSearch)
  }, [omniSearch])

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
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
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
        <Command.List className='os-results'>
          <Command.Empty>No results found.</Command.Empty>

          <Command.Group className='os-heading' heading='rfcs'>
            <Command.Item>rfc 1</Command.Item>
            <Command.Item>rfc 2</Command.Item>
            <Command.Separator />
            <Command.Item>rfc 3</Command.Item>
          </Command.Group>
          <Command.Group className='os-heading' heading='groups'>
            <Command.Item>group a</Command.Item>
            <Command.Item>group b</Command.Item>
            <Command.Separator />
            <Command.Item>group c</Command.Item>
          </Command.Group>
          <Command.Group className='os-heading' heading='streams'>
            <Command.Item>stream 1</Command.Item>
            <Command.Item>stream 2</Command.Item>
            <Command.Separator />
            <Command.Item>stream 3</Command.Item>
          </Command.Group>
          <Command.Group className='os-heading' heading='settings'>
            <Command.Item>setting 1</Command.Item>
            <Command.Item>setting 2</Command.Item>
            <Command.Separator />
            <Command.Item>setting 3</Command.Item>
          </Command.Group>
          <Command.Item>Apple</Command.Item>
        </Command.List>
      </Command.Dialog>
      <div ref={omniSearchAnchor} />
    </>
  )
}

export default OmniSearch
