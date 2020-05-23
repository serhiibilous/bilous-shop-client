import React from 'react'
import { act, cleanup, render, waitForElement, fireEvent } from '@testing-library/react'
import PageLogin from './page-login'
import { withMockedRouter } from '@Main/utils'

describe('Login component', () => {
  afterEach(cleanup)

  test('it shows login form and input values', async () => {
    await act(async () => {
      const { getByTestId, getByDisplayValue, getByText } = render(withMockedRouter(<PageLogin />))
      const userEmail = 'email@email.com'
      const userPassword = '1234567'

      await waitForElement(() => getByText('Логін'))

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

      await waitForElement(() => [getByDisplayValue(userEmail), getByDisplayValue(userPassword)])
    })
  })
})
