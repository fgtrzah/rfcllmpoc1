import {
  useContext,
  useEffect,
  useState,
  createContext,
  ReactChild,
} from 'react'

const ws = new WebSocket('ws://localhost:8000/qa/single/ws')

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
