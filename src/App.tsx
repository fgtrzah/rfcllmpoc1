import {
  NoMatch,
  Overview,
  Profile,
  Search,
  SearchResultDetail,
  Settings,
} from './pages'
import { Route, Routes } from 'react-router'
import './App.css'
import { colors } from './config'
import {
  ChatIcon,
  BodyContainer,
  OmniSearch,
  FooterContainer,
  OmniChat,
  Navigation,
} from './components'
import { useEffect } from 'react'
import { useAuth, useOmniChat, useQAVisibility } from './state'
import { useObservable } from 'react-use'

function App() {
  const { handleAuthReq } = useAuth({})

  useEffect(() => {
    handleAuthReq({})
  }, [])

  return (
    <>
      <Navigation>
        <button
          style={{
            color: colors['12'],
            textDecoration: 'none',
            padding: 5,
            background: 'none',
            appearance: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => {
            if (window.location.hash.includes('qa')) {
              window.location.hash = ''
            } else {
              window.location.hash = 'qa'
            }
          }}
        >
          <ChatIcon />
        </button>
      </Navigation>
      <BodyContainer>
        <OmniSearch />
        <Routes>
          <Route path='/'>
            <Route path='search/:rfcid' element={<SearchResultDetail />} />
            <Route path='search' element={<Search />} />
            <Route path='settings' element={<Settings />} />
            <Route path='profile' element={<Profile />} />
            <Route path='/' element={<Overview />} />
            <Route path='*' element={<NoMatch />} />
          </Route>
        </Routes>
      </BodyContainer>
      <FooterContainer>
        <OmniChat />
      </FooterContainer>
    </>
  )
}

export default App
