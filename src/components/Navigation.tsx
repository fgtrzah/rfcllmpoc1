/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactChild, useEffect } from 'react'
import { VITE_REACT_APP_GHOKPAT, colors } from '../config'
import SidebarIcon from './SidebarIcon'
import {
  HomeIcon,
  LoginIcon,
  LogoutIcon,
  ProfileIcon,
  SearchIcon,
  SettingsIcon,
} from '.'
import { useOctokit } from 'src/state'
import { deOnion } from 'src/utils'

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
  user?: {
    [x: string]: any
  }
  login?: () => void
}

const linkAsBtnStyles: React.CSSProperties = {
  appearance: 'none',
  background: 'none',
  textDecoration: 'none',
  border: 'none',
  padding: 5,
  cursor: 'pointer',
  color: colors['12'],
}

function Navigation(props: Navigationnavconfig) {
  const { user, login } = props
  const navconfig: Navigationnavconfig = {
    links: {
      top: [
        {
          to: 'https://datatracker.ietf.org/',
          text: 'Data Tracker',
          onClick: (e: any) =>
            (window.location.href = 'https://datatracker.ietf.org'),
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
      ],
      left: [
        {
          to: '/',
          children: <HomeIcon />,
          onClick: (e: any) => console.log(e.target.value),
        },
        user
          ? {
              to: 'profile',
              title: 'Under construction',
              children: <ProfileIcon />,
              onClick: (e: any) => console.log(e.target.value),
            }
          : null,
        user
          ? {
              to: 'search',
              children: <SearchIcon />,
              onClick: (e: any) => console.log(e.target.value),
            }
          : null,
        user
          ? {
              to: 'settings',
              title: 'Under construction',
              children: <SettingsIcon />,
              onClick: (e: any) => console.log(e.target.value),
            }
          : null,
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
            if (l === null) return
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
            if (l === null) return
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
          {user.data ? (
            <button
              onClick={() =>
                (window.location.href = 'https://github.com/logout')
              }
              style={linkAsBtnStyles}
            >
              <LogoutIcon />
            </button>
          ) : (
            <button style={linkAsBtnStyles} onClick={() => login()}>
              <LoginIcon />
            </button>
          )}
        </nav>
      </aside>
    </>
  )
}

export default Navigation
