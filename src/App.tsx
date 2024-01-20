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
import { useAuth } from './state'
import { useEffect } from 'react'

function App() {
  const { auth, handleAuthReq } = useAuth({})

  useEffect(() => {
    handleAuthReq({})
  }, [])

  return (
    <>
      <Navigation>
        <a
          href='#qa'
          style={{
            color: colors['12'],
            textDecoration: 'none',
            padding: 5,
          }}
        >
          <ChatIcon />
        </a>
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
