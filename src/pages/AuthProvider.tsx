import React, { createContext, useContext, useEffect } from 'react'
import './AuthProvider.css'
import { useAuth } from '../api/rfcllmapiComponents'
import { Token } from '../api/rfcllmapiSchemas'
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  mutationCache: new MutationCache(),
  defaultOptions: {},
})

const authContext = createContext<{
  token?: Token | unknown
  client?: any
}>({
  token: undefined,
  client: queryClient,
})
export default function AuthProvider({
  children,
  ...props
}: {
  children: React.ReactNode
}) {
  const { token, error, login } = useAuth()

  return (
    <authContext.Provider value={{ token: { access_token: token } }}>
      {error && (
        <strong style={{ color: 'red' }}>
          {JSON.stringify(error, null, 2)}
        </strong>
      )}
      {true ? (
        children
      ) : (
        <main className='pa4 bla ck-80'>
          <form
            className='measu  re center'
            onSubmit={async (e) => {
              e.preventDefault()
              const data: any = new FormData(e.currentTarget)
              await login(data.get('username'), data.get('password'))
            }}
          >
            <fieldset id='sign_up' className='ba b--transparent ph0 mh0 white'>
              <legend className='f4 fw6 ph0 mh0'>Sign In</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='username'>
                  Username
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='text'
                  name='username'
                  id='username'
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>
                  Password
                </label>
                <input
                  className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type='password'
                  name='password'
                  id='password'
                />
              </div>
              <label className='pa0 ma0 lh-copy f6 pointer'>
                <input type='checkbox' /> Remember me
              </label>
            </fieldset>
            <div className=''>
              <input
                className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
                type='submit'
                defaultValue='Sign in'
              />
            </div>
            <div className='lh-copy mt3'>
              <a href='#0' className='f6 link dim black db'>
                Sign up
              </a>
              <a href='#0' className='f6 link dim black db'>
                Forgot your password?
              </a>
            </div>
          </form>
        </main>
      )}
    </authContext.Provider>
  )
}

export const useToken = () => {
  const { token } = useContext(authContext)

  return token
}
