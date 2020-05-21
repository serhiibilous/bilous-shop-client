import React from 'react'
import { Router } from 'react-router-dom'
import { store } from '@Main/store'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'

export function withMockedRouter(node: React.ReactElement) {
  const history = createMemoryHistory()

  return (
    <Router history={history}>
      <Provider store={store}>{node}</Provider>
    </Router>
  )
}

export function mockedFetchRequest(response: any) {
  // @ts-ignore
  return jest.spyOn(window, 'fetch').mockImplementation(() => {
    const fetchResponse = {
      json: () => Promise.resolve(response),
    }
    return Promise.resolve(fetchResponse)
  })
}
