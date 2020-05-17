import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from '@Main/store'

export function PublicRoute({ component: Component, ...rest }: any) {
  const { loggedIn, user } = useSelector((state: AppState) => state.system)

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Redirect
            to={{
              pathname: user && user.role === 'user' ? '/user/home' : '/admin/home',
              state: { form: props.location },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}
