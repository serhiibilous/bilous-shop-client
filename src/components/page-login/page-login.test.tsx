import React from 'react'
import { render } from '@testing-library/react'
import PageLogin from './page-login'
import { Provider } from 'react-redux'
import { store } from '@Main/store'

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <PageLogin />
    </Provider>,
  )
  const linkElement = getByText(/Логін/i)
  expect(linkElement).toBeInTheDocument()
})
