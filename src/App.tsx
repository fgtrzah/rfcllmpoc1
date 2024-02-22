import {
    Evals,
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
import { useOctokitService, useOmniChat } from './state'
import { useEffect } from 'react'

function App() {
  const { user, login } = useOctokitService()
  const { toggleQA } = useOmniChat()

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <>
      <Navigation user={user} login={login}>
        {user ? (
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
              window.location.hash = window.location.hash.includes('qa')
                ? ''
                : 'qa'

              toggleQA()
            }}
          >
            <ChatIcon />
          </button>
        ) : null}
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
            <Route path='/evals' element={<Evals />} />
            <Route path='*' element={<NoMatch />} />
          </Route>
        </Routes>
      </BodyContainer>
      <FooterContainer>{user ? <OmniChat /> : null}</FooterContainer>
    </>
  )
}

export default App
