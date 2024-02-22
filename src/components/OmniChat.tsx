import React, { useEffect } from 'react'
import './OmniChat.css'
import { useForm, useOmniChat } from 'src/state'
import { CloseIcon } from '.'

export interface OmniChatProps extends React.PropsWithChildren {
  [x: string]: unknown
}

const OmniChat = (props: OmniChatProps) => {
  const {
    omniChat: omniChatStore,
    loading,
    handleSend,
    toggleQA,
  } = useOmniChat()
  const { data, handleChange, handleSubmit, errors } = useForm<any>({
    validations: {
      name: {
        pattern: {
          value: '^[A-Za-z]*$',
          message: 'Error...',
        },
      },
    },
    onSubmit: handleSend,
  })
  useEffect(() => {

    const down = (e: KeyboardEvent) => {
      if (e.key === 'b' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        window.location.hash = window.location.hash.includes('qa') ? '' : 'qa'
        toggleQA()
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return window.location.hash.includes('qa') ? (
    <div className='oc-container'>
      <header className='oc-header'>
        <span>QA Context: {omniChatStore.scopes as any}</span>
        <button
          onClick={toggleQA}
          style={{
            background: 'none',
            border: 'none',
            appearance: 'none',
            color: '#b7cbf4',
            cursor: 'pointer',
          }}
        >
          <CloseIcon />
        </button>
      </header>
      <main className='oc-content'>
        {loading && 'Processing response...'}
        {omniChatStore.completions[0]?.completion?.choices?.map(
          (m: any, mi: number) => {
            return (
              <>
                <span key={mi}>
                  <strong>{m.message.role.toUpperCase()}:</strong>
                  {m.message.content}
                </span>
              </>
            )
          },
        )}
      </main>
      <section>{props?.children}</section>
      <footer className='oc-footer'>
        <form onSubmit={handleSubmit}>
          <input
            disabled={loading}
            style={{ width: 380, background: 'none' }}
            value={omniChatStore.search}
            name='query'
            placeholder='Describe your business...'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value)
            }
          />
        </form>
      </footer>
    </div>
  ) : null
}

export default OmniChat
