import React from 'react'
import { act, render, cleanup, waitForElement } from '@testing-library/react'
import { withMockedRouter, mockedFetchRequest } from '@Main/utils'
import { fakeProductList } from './mocks'
import PageHome from './page-home'

describe('Home component', () => {
  afterEach(cleanup)

  test('it shows a list of latest products', async () => {
    mockedFetchRequest(fakeProductList)

    await act(async () => {
      const { getByText } = render(withMockedRouter(<PageHome />))

      await waitForElement(() => [
        getByText('First product name'),
        getByText('Second product description'),
        getByText('Third product description'),
      ])
    })
  })
})
