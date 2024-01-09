import React, { useState } from 'react'

export interface QAVisibilityProps {
  active: boolean
  scopes?: string
  [x: string]: any
}

const useQAVisibility = (opts: QAVisibilityProps) => {
  const [active, setActive] = useState(opts.active || false)
  const [scopes, setQAScopes] = useState(
    opts.scopes || window.location.pathname,
  )

  return {
    active,
    scopes,
    toggleQA: () => setActive(!active),
    setQAScopes: (s: string) => setQAScopes(s),
  }
}

export default useQAVisibility
