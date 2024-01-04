import React, { ReactChild } from 'react'
import { colors } from '../config'
import SidebarIcon from './SidebarIcon'

type LinkObj = {
  text?: string | any
  children?: ReactChild
  to?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  [x: string]: any
}

interface NavigationProps extends React.PropsWithChildren {
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

function Navigation(props: NavigationProps) {
  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 8,
          left: 20,
          right: 20,
        }}
      >
        <nav
          style={{
            padding: 8,
            borderRadius: 6,
            backgroundColor: '#444',
          }}
        >
          {props?.links?.top?.map?.((l: LinkObj, lk: number) => {
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
                {l.text}
              </a>
            )
          })}
        </nav>
      </header>
      <aside>
        <nav
          style={{
            padding: 4,
            borderRadius: 6,
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
          {props?.links?.left?.map?.((l: LinkObj, lk: number) => {
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
        </nav>
      </aside>
    </>
  )
}

export default Navigation
