import React from 'react'
import { Container } from './page-not-found-components'
import { useTranslation } from 'react-i18next'

export default function PageNotFound() {
  const { t } = useTranslation()

  return (
    <Container>
      <div className="text-center">
        <h1>{t('404.Title')}</h1>
        <p>{t('404.Description')}</p>
      </div>
    </Container>
  )
}
