import React, { Suspense } from 'react'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { Router } from 'react-router-dom'
import { store } from '@Main/store'
import { Provider } from 'react-redux'
import { createMemoryHistory } from 'history'
import * as englishTranslation from '../../public/locales/en/translation.json'

export function withMockedRouter(node: React.ReactElement) {
  const history = createMemoryHistory()

  return (
    <Suspense fallback="Loading...">
      <Router history={history}>
        <Provider store={store}>{node}</Provider>
      </Router>
    </Suspense>
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

export function mockI18next() {
  i18next
    .use(initReactI18next)
    .init({
      lng: 'en',
      fallbackLng: 'en',
      lowerCaseLng: true,
      resources: {
        en: {
          translation: englishTranslation,
        },
      },
      initImmediate: false,
    })
    .then()
}
