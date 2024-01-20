import { RFCAPIEP, TEST_USERNAME, TEST_USERPW } from 'src/config'
import { useStore } from '.'

type UseAuthProps = {
  [x: string]: any
}

const useAuth = (_opts: UseAuthProps) => {
  const [store, dispatch] = useStore()
  const auth = store.auth
  const handleAuthReq = async (opts: any) => {
    const res = await (
      await fetch(`${RFCAPIEP}/token`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
        },
        body: new URLSearchParams({
          username: TEST_USERNAME,
          password: atob(TEST_USERPW),
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
