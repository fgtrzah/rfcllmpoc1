import React from 'react'

interface SearchResultDetailProps extends React.PropsWithChildren {
  [x: string]: any
}

const SearchResultDetail = (_: SearchResultDetailProps) => {
  return <div>Search Result Detail</div>
}

export default SearchResultDetail
