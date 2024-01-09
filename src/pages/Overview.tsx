import React from 'react'
import './Overview.css'
import { NumAPCitations, NumCitations, NumDocAuths } from 'src/components'

const Overview = (_props: React.PropsWithChildren) => {
  return (
    <main style={{ fontSize: 8 }}>
      <section className='cf mt5 pv5 bt b--black-05 ph6-l'>
        <h1 className='f5 ttu fw6 mb4'>Overview</h1>

        <div
          style={{
            border: '1px dotted #B7CBF4',
            textDecoration: 'none',
            maxHeight: 325,
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            padding: 9,
          }}
          className='last9 fl w-50 h-50 border-box ba '
          title=''
        >
          <NumAPCitations />
        </div>
        <div
          style={{
            border: '1px dotted #B7CBF4',
            textDecoration: 'none',
            maxHeight: 325,
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            padding: 9,
          }}
          className='last9 fl w-50 h-50 border-box ba '
          title=''
        >
          <NumCitations />
        </div>
        <div
          className='last8 fl w-50 border-box overflow-hidden ba'
          style={{
            border: '1px dotted #B7CBF4',
            textDecoration: 'none',
            maxHeight: 325,
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            padding: 9,
          }}
        >
          <NumCitations />
        </div>
        <div
          style={{
            border: '1px dotted #B7CBF4',
            textDecoration: 'none',
            maxHeight: 325,
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            padding: 9,
          }}
          className='last9 fl w-50 h-50 border-box ba '
          title=''
        >
          <NumDocAuths />
        </div>
        <div
          style={{
            border: '1px dotted #B7CBF4',
            textDecoration: 'none',
            maxHeight: 325,
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            padding: 9,
          }}
          className='last9 fl w-100 h-50 border-box ba '
          title=''
        >
          <NumDocAuths />
        </div>
      </section>
    </main>
  )
}

export default Overview
