import React, { useEffect, useState } from 'react'
import './Overview.css'
import { useDatasets } from 'src/state'
import {
  AffiliationsContinent,
  NumAPCitations,
  NumCitations,
  NumDocAuths,
} from 'src/components'

const Overview = (_props: React.PropsWithChildren) => {
  const { index, file, response, setFile } = useDatasets({
    file: 'affpoaauthorsdrafts.csv',
  })
  useEffect(() => {
    console.log(response?.content?.split('\n'))
  }, [response])
  const handleFileSelect = (e: any) => {
    const f = e.target.value
    console.log(f)
    setFile(f)
  }
  return (
    <main style={{ fontSize: 8 }}>
      <section className='cf mt5 bt b--black-05'>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h1 className='f5 ttu fw6'>Overview</h1>
          <select onChange={handleFileSelect}>
            {Object.keys(index)?.map?.((k: string, ki: number) => {
              return (
                <option value={k} key={ki}>
                  {k}
                </option>
              )
            })}
          </select>
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
        >
          <pre>{response.content}</pre>
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
          className='last9 fl w-50 h-50 border-box ba '
          title=''
        >
          <AffiliationsContinent />
        </div>
        <div
          style={{
            border: '1px dotted #B7CBF4',
            textDecoration: 'none',
            maxHeight: 325,
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            padding: 9,
            width: '100%',
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
