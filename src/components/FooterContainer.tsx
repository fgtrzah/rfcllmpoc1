import React from 'react'

export default function FooterContainer(props: React.PropsWithChildren) {
  return <footer style={{ padding: 75 }}>{props.children}</footer>
}
