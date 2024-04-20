import React, { useEffect } from 'react'
import './OmniChat.css'
import { useForm, useOmniChat } from 'src/state'
import {
  BackwardIcon,
  CloseIcon,
  ExpandIcon,
  ForwardIcon,
  FuseLLMIcon,
  LLMSymbolIcon,
  RestartIcon,
  SendMessageIcon,
} from '.'
import { colors } from 'src/config'

export interface OmniChatProps extends React.PropsWithChildren {
  [x: string]: unknown
}

const OmniChat = (props: OmniChatProps) => {
  const {
    omniChat: omniChatStore,
    loading,
    handleSend,
    toggleQA,
    toggleQAPanel,
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
  useEffect(() => { }, [omniChatStore.completions])

  return window.location.hash.includes('qa') ? (
    <div className='oc-container'>
      <header className='oc-header'>
        <span>QA Context: {omniChatStore.scopes as any}</span>
        <div>
          <button
            onClick={() => console.log('launch llm selector')}
            style={{
              background: 'none',
              border: 'none',
              appearance: 'none',
              color: '#b7cbf4',
              cursor: 'pointer',
            }}
          >
            <FuseLLMIcon />
          </button>
          <button
            onClick={() => console.log('launch llm selector')}
            style={{
              background: 'none',
              border: 'none',
              appearance: 'none',
              color: '#b7cbf4',
              cursor: 'pointer',
            }}
          >
            <LLMSymbolIcon />
          </button>
          <button
            onClick={toggleQAPanel}
            style={{
              background: 'none',
              border: 'none',
              appearance: 'none',
              color: '#b7cbf4',
              cursor: 'pointer',
            }}
          >
            <ExpandIcon />
          </button>

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
        </div>
      </header>

      <main className='oc-content' style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {loading && 'Processing response...'}
        <div style={{ top: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              appearance: 'none',
              color: '#b7cbf4',
              cursor: 'pointer',
            }}
          >
            <BackwardIcon />
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              appearance: 'none',
              color: '#b7cbf4',
              cursor: 'pointer',
            }}
          >
            <ForwardIcon />
          </button>
        </div>
        <br />
        {omniChatStore.completions[0]?.completion?.choices?.map(
          (m: any, mi: number) => {
            return (
              <span key={mi}>
                <dt style={{ marginBottom: 4 }}>
                  <strong style={{ color: colors[5] }}>
                    {m.message.role.toUpperCase()}:
                  </strong>
                </dt>
                <dd>{m.message.content}</dd>
              </span>
            )
          },
        )}
        <br />

      </main>
      <section>{props?.children}</section>
      <footer className='oc-footer'>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <input
            disabled={loading}
            style={{ flexGrow: 1, backgroundColor: 'rgba(0,0,0,0) !important' }}
            value={omniChatStore.search}
            name='query'
            placeholder='Ask a question about this RFC'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value)
            }
          />
          <div style={{ display: 'flex' }}>
            <button
              onClick={() => console.log('restart')}
              style={{
                background: 'none',
                border: 'none',
                appearance: 'none',
                color: '#b7cbf4',
                cursor: 'pointer',
              }}
              title='Regenerate response'
            >
              <RestartIcon />
            </button>
            <button
              type='submit'
              style={{
                background: 'none',
                border: 'none',
                appearance: 'none',
                color: '#b7cbf4',
                cursor: 'pointer',
              }}
            >
              <SendMessageIcon />
            </button>
          </div>
        </form>
      </footer>
    </div>
  ) : null
}

export default OmniChat
