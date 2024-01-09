import React, { useEffect } from 'react'
import { Command } from 'cmdk'
import { useSearch } from 'src/state'
import { Link } from 'react-router-dom'

const normalizeResults = (search: any) => {
  let output: { [x: string]: any } = {}
  search = search.resultsById.results

  for (let i = 1; i < search?.length - 2; i++) {
    if (search[i].length > 2) {
      output[search[i][0]] = [
        ...search[i],
        ...[search[i + 1][1], search[i + 2][1]],
      ]
    }
  }

  return output
}

const composeRFCLink = (delimitedID: string, format: string) => {
  const sp = delimitedID.replace(' ', '')
  console.log(delimitedID.toLowerCase().replace(' ', ''))
  const reformattedRFCNumber: string = sp.length
    ? `${sp}.${format.toLowerCase()}`.replace(' ', '')
    : '#'
  return reformattedRFCNumber
}

function OmniSearchResults() {
  const search = normalizeResults(useSearch().search)
  const ids = Object.keys(search)?.slice(25)

  useEffect(() => {
    console.log(search)
  }, [search])

  return (
    <Command.List
      className='os-results'
      style={{
        maxHeight: '70vh',
        overflow: 'scroll',
        padding: 20,
        scrollbarWidth: 'none',
        maskBorder: 'round',
        msScrollbarTrackColor: 'rgba(0,0,0,0)',
        textWrap: 'nowrap',
        maxWidth: '100%',
      }}
    >
      {ids.length ? null : <Command.Empty>No results found.</Command.Empty>}
      <table style={{ overflow: 'scroll' }}>
        <caption style={{ textAlign: 'left' }}>RFCS:</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {ids?.map?.((r: any, ir: number) => {
            return (
              <tr tabIndex={0} key={ir}>
                <td title={search[r][0]}>
                  <Link tabIndex={-1} to={`/search/${search[r][0]}`}>
                    {search[r][0].split('')}
                  </Link>
                </td>
                <td title={search[r][2]}>
                  {search[r][2].slice(0, 60) + '...'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Command.Separator
        style={{ height: 2, backgroundColor: '#555', margin: '5px 0px' }}
        hidden={false}
      />
    </Command.List>
  )
}

export default OmniSearchResults
