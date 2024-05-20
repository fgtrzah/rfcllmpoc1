import { useEffect, useState } from 'react'
import { RFCAPIEP } from 'src/config'

type DatasetProps = {
  [x: string]: any
}

export async function getDSIndex() {
  let headers = new Headers()
  headers.append('Content-Type', 'application/json')

  try {
    const result = (await (await fetch(`${RFCAPIEP}/datasets/index`)).json())
      ?.data?.attributes
    return result
  } catch (error) {
    return error
  }
}

export async function getDSFile(file: string) {
  let headers = new Headers()
  headers.append('Content-Type', 'application/json')

  try {
    const result = (await (await fetch(`${RFCAPIEP}/datasets/${file}`)).json())
      ?.data?.attributes
    return result
  } catch (error) {
    return error
  }
}

const useDatasets = (opts: DatasetProps) => {
  const [file, setFile] = useState(opts?.file || '')
  const [index, setIndex] = useState({})
  const [response, setResponse] = useState({})
  useEffect(() => {
    getDSIndex()
      .then((v) => setIndex(v))
      .catch((e) => setIndex({}))
  }, [])
  useEffect(() => {
    if (file)
      getDSFile(file)
        .then((v) => setResponse(v))
        .catch(() => setResponse({}))
  }, [file])
  return {
    setFile,
    file,
    index,
    response,
  }
}

export default useDatasets
