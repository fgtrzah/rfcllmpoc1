import { useStore } from '.'

type UseAuthProps = {
  [x: string]: any
}

const useAuth = (_opts: UseAuthProps) => {
  const [store, dispatch] = useStore()
  const auth = store.auth
  const handleAuthReq = async (opts: any) => {
    const res = await (
      await fetch('http://127.0.0.1:8000/token', {
        method: 'POST',
        headers: {
          accept: 'application/json',
        },
        body: new URLSearchParams({
          username: 'johndoe',
          password: 'secret',
        }),
      })
    ).json()

    dispatch({
      ...store,
      auth: {
        ...store.auth,
        ...res,
      },
    })

    localStorage.setItem('rfcllmauthbearer', res)
  }

  const handleLogout = () => {
    localStorage.removeItem('rfcllmauthbearer')
  }
  return {
    auth,
    handleAuthReq,
    handleLogout,
  }
}

export default useAuth
