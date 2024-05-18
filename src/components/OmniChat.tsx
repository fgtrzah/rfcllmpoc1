import React, { useEffect, useState } from 'react'
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

const btnstyles: React.CSSProperties = {
  background: 'none',
  border: 'none',
  appearance: 'none',
  color: '#b7cbf4',
  cursor: 'pointer',
}

const OmniChat = (props: OmniChatProps) => {
  const {
    omniChat: omniChatStore,
    loading,
    handleSubmit,
    toggleQA,
    handleChange,
    toggleQAPanel,
  } = useOmniChat()
  const [msgpool, setmsgpool] = useState(omniChatStore.completions)

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

  useEffect(() => {
    setmsgpool([...msgpool, ...omniChatStore.completions])
  }, [omniChatStore.completions])

  return window.location.hash.includes('qa') ? (
    <div className='oc-container'>
      <header className='oc-header'>
        <span>QA Context: {omniChatStore.scopes as any}</span>
        <div>
          <button
            onClick={() => console.log('launch llm selector')}
            style={btnstyles}
          >
            <FuseLLMIcon />
          </button>
          <button
            onClick={() => console.log('launch llm selector')}
            style={btnstyles}
          >
            <LLMSymbolIcon />
          </button>
          <button onClick={toggleQAPanel} style={btnstyles}>
            <ExpandIcon />
          </button>

          <button onClick={toggleQA} style={btnstyles}>
            <CloseIcon />
          </button>
        </div>
      </header>
      <main
        className='oc-content'
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {loading && 'Processing response...'}
        <div
          style={{
            margin: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button style={btnstyles}>
            <BackwardIcon />
          </button>
          <button style={btnstyles}>
            <ForwardIcon />
          </button>
        </div>
        <br />
        {msgpool.map((c: any, ci: number) => {
          const role = c?.choices?.[0]?.message?.role
          const content =
            c?.choices?.[0]?.message?.content || c?.choices?.[0]?.text
          return (
            <span key={ci}>
              <dt style={{ marginBottom: 4, display: 'flex' }}>
                <strong
                  style={{ color: role === 'user' ? colors[5] : colors[8] }}
                >
                  {role?.toUpperCase?.() || 'unknown sender'}:
                </strong>
              </dt>
              <dd>{content || 'issue loading message'}</dd>
            </span>
          )
        })}
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
            onChange={handleChange}
          />
          <div style={{ display: 'flex' }}>
            <button
              onClick={() => console.log('restart')}
              style={btnstyles}
              title='Regenerate response'
            >
              <RestartIcon />
            </button>
            <button type='submit' style={btnstyles}>
              <SendMessageIcon />
            </button>
          </div>
        </form>
      </footer>
    </div>
  ) : null
}

export default OmniChat
