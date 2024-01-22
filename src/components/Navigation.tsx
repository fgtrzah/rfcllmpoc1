import React, { ReactChild } from 'react'
import { colors } from '../config'
import SidebarIcon from './SidebarIcon'
import { useAuth } from 'src/api/rfcllmapiComponents'
import { ChatIcon, HomeIcon, ProfileIcon, SearchIcon, SettingsIcon } from '.'

type LinkObj = {
  text?: string | any
  children?: ReactChild
  title?: string
  to?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  [x: string]: any
}

interface Navigationnavconfig extends React.PropsWithChildren {
  links?: {
    top?: LinkObj[]
    left?: LinkObj[]
    bottom?: LinkObj[]
    right?: LinkObj[]
    [x: string]: any
  }
  slots?: {
    top?: React.ReactNode[]
    left?: React.ReactNode[]
    bottom?: React.ReactNode[]
    right?: React.ReactNode[]
    [x: string]: any
  }
}

function Navigation(props: Navigationnavconfig) {
  const { logout } = useAuth()
  const navconfig: Navigationnavconfig = {
    links: {
      top: [
        {
          to: '#',
          text: 'Data Tracker',
          onClick: (e: any) => window.location.href = 'https://datatracker.ietf.org',
        },
        {
          to: 'about',
          text: 'About',
          onClick: (e: any) => console.log(e.target.value),
        },
        {
          to: '#',
          title: 'Under construction',
          disabled: true,
          text: 'Docs',
          onClick: (e: any) => console.log(e.target.value),
        },
        {
          to: '#',
          title: 'Under construction',
          disabled: true,
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
          title: 'Under construction',
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
          title: 'Under construction',
          children: <SettingsIcon />,
          onClick: (e: any) => console.log(e.target.value),
        },
      ],
    },
    slots: {},
  }
  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
        <nav
          style={{
            padding: 8,
            borderRadius: 8,
            backgroundColor: '#444',
          }}
        >
          {navconfig?.links?.top?.map?.((l: LinkObj, lk: number) => {
            return (
              <a
                onClick={(e: React.MouseEvent<HTMLElement>) => l?.onClick?.(e)}
                key={lk}
                style={{
                  color: colors['12'],
                  textDecoration: 'none',
                  cursor: l.disabled ? 'not-allowed' : 'pointer',
                  padding: 5,
                }}
                href={`${l.to}`}
                title={l.title}
              >
                {l.text}
              </a>
            )
          })}
        </nav>
      </header>
      <aside
        style={{
          zIndex: 9999,
        }}
      >
        <nav
          style={{
            padding: 4,
            borderRadius: 8,
            backgroundColor: '#444',
            position: 'fixed',
            top: 100,
            bottom: 100,
            left: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <a
            href='#'
            style={{
              color: colors['12'],
              textDecoration: 'none',
              padding: 5,
            }}
          >
            <SidebarIcon />
          </a>
          {navconfig?.links?.left?.map?.((l: LinkObj, lk: number) => {
            return (
              <a
                onClick={(e: React.MouseEvent<HTMLElement>) => l?.onClick?.(e)}
                key={lk}
                style={{
                  color: colors['12'],
                  textDecoration: 'none',
                  padding: 5,
                }}
                href={`${l.to}`}
                title='#'
              >
                {l?.text?.charAt?.(0)}
                {l?.children}
              </a>
            )
          })}
          {props.children}
        </nav>
      </aside>
    </>
  )
}

export default Navigation
