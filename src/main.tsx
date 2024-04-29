import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './pages'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { SharedStoreProvider } from './state'
import { SocketProvider } from './state/useSocket'

const queryClient = new QueryClient()

const Index = ({ children }: any) => (
  <SocketProvider>
    <SharedStoreProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </SharedStoreProvider>
  </SocketProvider>
)

const router = createBrowserRouter([
  {
    path: '*',
    element: (
      <Index>
        <App />
      </Index>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
