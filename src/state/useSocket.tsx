import { useContext, createContext, ReactChild } from 'react'

const ws = new WebSocket('ws://127.0.0.1:8000/qa/single/ws')

export const SocketContext = createContext(ws)

interface ISocketProvider {
  children: ReactChild
}

export const SocketProvider = (props: ISocketProvider) => (
  <SocketContext.Provider value={ws}>{props.children}</SocketContext.Provider>
)

export const useSocket = () => {
  const socket = useContext(SocketContext)

  return socket
}
