import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Loader } from '@Main/components'
import { loginUser, logoutUser, updateUser } from '@Main/store/system/actions'
import { UserService } from '@Main/services'

export function Authorization({ children }: any) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true)
  const token = localStorage.getItem('aut-token')
  const userService = new UserService(token!)

  function userRequest() {
    userService.getCurrentUser().then(
      (data) => {
        if (data.error) {
          dispatch(logoutUser())
          dispatch(updateUser(null))
          localStorage.removeItem('aut-token')
          setLoading(false)
        } else {
          dispatch(loginUser({ token: token! }))
          dispatch(updateUser(data.user))
          setLoading(false)
        }
      },
      (error) => {
        console.log(error)
      },
    )
  }

  React.useEffect(() => {
    if (token) {
      userRequest()
    } else {
      localStorage.removeItem('aut-token')
      dispatch(logoutUser())
      dispatch(updateUser(null))
      setLoading(false)
    }
  }, [])

  if (loading) return <Loader />

  return children
}
