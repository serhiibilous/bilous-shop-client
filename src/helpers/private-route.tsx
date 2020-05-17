import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from '@Main/store'

export function PrivateRoute({ component: Component, ...rest }: any) {
  const { loggedIn } = useSelector((state: AppState) => state.system)

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { form: props.location },
            }}
          />
        )
      }
    />
  )
}
