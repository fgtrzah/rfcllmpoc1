import React, { useEffect } from 'react'
import { Command } from 'cmdk'
import { useSearch } from 'src/state'

const normalizeResults = (search: any) => {
  let output: { [x: string]: any } = {}
  search = search.resultsById.results

  for (let i = 1; i < search?.length - 2; i++) {
    if (search[i].length > 2) {
      output[search[i][0]] = [...search[i], ...[search[i + 1][1], search[i + 2][1]]]
    }
  }

  return output
}

function OmniSearchResults() {
  const search = normalizeResults(useSearch().search)
  const ids = Object.keys(search)?.slice(25)

  useEffect(() => {
    console.log(search)
  }, [search])

  return (
    <Command.List className='os-results' style={{ 
      maxHeight: '70vh', 
      overflowY: 'scroll', 
      padding: 20, 
      scrollPadding: 'unset', 
      scrollbarWidth: 'none', 
      maskBorder: 'round', 
      textWrap: 'nowrap' 
    }}>
      {ids.length ? null : <Command.Empty>No results found.</Command.Empty>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Formats</th>
            <th>Title</th>
            <th>Authors</th>
            <th>Date</th>
            <th>Updates</th>
            <th>Status</th>
            <th>Abstract</th>
            <th>Keywords</th>
          </tr>
        </thead>
        <tbody>
          {ids?.map?.((r: any, ir: number) => {
            return (
              <tr key={ir}>
                {search[r]?.map?.((rc: any, i: number) => (
                  <td key={i} title={rc}>
                    {rc}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </Command.List >
  )
}

export default OmniSearchResults
