import { RFCLLMEP } from 'src/config'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SearchResultDetail = (props: React.PropsWithChildren & any) => {
  const { rfcid } = useParams()

  return <div style={{ display: 'flex', paddingTop: 20 }}>{rfcid}</div>
}

export default SearchResultDetail
