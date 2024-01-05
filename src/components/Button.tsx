export default function Button(props: any) {
  return (
    <button style={{ background: 'none', appearance: 'none' }}>
      {props.children}
    </button>
  )
}
