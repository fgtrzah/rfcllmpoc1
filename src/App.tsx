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
import { RFCDOCTREE, colors } from './config'
import {
  ChatIcon,
  BodyContainer,
  OmniSearch,
  FooterContainer,
  OmniChat,
  Navigation,
  LogoutIcon,
  QAPaneContainer,
} from './components'
import { useOmniChat, useAuthService, useOctokit } from './state'
import { useEffect } from 'react'
import { OAuthPopup } from '@tasoskakour/react-use-oauth2'
import { useOctokitService } from './state/useOctokit'

function App() {
  const { data, loading, error, getAuth, logout } = useAuthService({
    onSuccess: (opts: any) => console.log(opts),
    onError: (opts: any) => console.log(opts),
  })
  const { user, login, access_token } = useOctokitService()
  const { toggleQA } = useOmniChat()
  const isLoggedIn = Boolean(data)

  useEffect(() => {
    console.log(data, loading, error)
  }, [data, loading, error])

  return (
    <>
      <Navigation data={data} login={getAuth} logout={logout}>
        {isLoggedIn
          ? [
              <button
                title='qa'
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
              </button>,
            ]
          : null}
      </Navigation>
      <BodyContainer>
        <OmniSearch />
        <Routes>
          <Route path='/'>
            <Route element={<OAuthPopup />} path='/auth/callback' />
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
      <QAPaneContainer />
      <FooterContainer>{data ? <OmniChat /> : null}</FooterContainer>
    </>
  )
}

export default App
