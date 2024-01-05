import {
  BodyContainer,
  HomeIcon,
  Navigation,
  OmniSearch,
  ProfileIcon,
  SearchIcon,
  SettingsIcon,
} from './components'
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
import { useAuth } from './api/rfcllmapiComponents'

function App() {
  const { logout } = useAuth()
  const navProps = {
    links: {
      top: [
        {
          to: '#',
          text: 'Data Tracker',
          onClick: (e: any) => console.log(e.target.value),
        },
        {
          to: 'about',
          text: 'About',
          onClick: (e: any) => console.log(e.target.value),
        },
        {
          to: '#',
          text: 'Docs',
          onClick: (e: any) => console.log(e.target.value),
        },
        {
          to: '#',
          text: 'GitHub',
          onClick: (e: any) => console.log(e.target.value),
        },
        { to: '#', flush: true, text: 'Logout', onClick: () => logout() },
      ],
      left: [
        {
          to: '/',
          children: <HomeIcon />,
          onClick: (e: any) => console.log(e.target.value),
        },
        {
          to: 'profile',
          children: <ProfileIcon />,
          onClick: (e: any) => console.log(e.target.value),
        },
        {
          to: 'search',
          children: <SearchIcon />,
          onClick: (e: any) => console.log(e.target.value),
        },
        {
          to: 'settings',
          children: <SettingsIcon />,
          onClick: (e: any) => console.log(e.target.value),
        },
      ],
    },
    slots: {},
  }

  return (
    <>
      <BodyContainer>
        <Navigation {...navProps} />
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
    </>
  )
}

export default App
