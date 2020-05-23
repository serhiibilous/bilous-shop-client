import React from 'react'
import { act, cleanup, render, waitForElement, fireEvent } from '@testing-library/react'
import { withMockedRouter } from '@Main/utils'
import PageSignUp from './page-sign-up'

describe('SignUp component', () => {
  afterEach(cleanup)

  test('it shows sign up form and input values', async () => {
    await act(async () => {
      const { getByTestId, getByDisplayValue, getByText } = render(withMockedRouter(<PageSignUp />))
      const userName = 'Name'
      const userEmail = 'email@email.com'
      const userPassword = '1234567'

      await waitForElement(() => getByText('Реєстрація'))

      await fireEvent.change(getByTestId('name'), {
        target: {
          value: userName,
        },
      })

      await fireEvent.change(getByTestId('email'), {
        target: {
          value: userEmail,
        },
      })

      await fireEvent.change(getByTestId('password'), {
        target: {
          value: userPassword,
        },
      })

      await waitForElement(() => [
        getByDisplayValue(userName),
        getByDisplayValue(userEmail),
        getByDisplayValue(userPassword),
      ])
    })
  })
})
