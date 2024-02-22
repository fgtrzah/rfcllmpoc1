interface SearchProps extends React.PropsWithChildren {
  [x: string]: unknown
}

const Search = (_: SearchProps) => {
  console.log(_)
  return <div>Search</div>
}

export default Search
