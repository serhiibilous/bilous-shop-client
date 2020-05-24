import React from 'react'
import i18n from '@Main/i18n'
import { Badge } from 'react-bootstrap'

export function RenderOrderStatus(status: string) {
  switch (status) {
    case 'inProgress':
      return <Badge variant="info">{i18n.t('Orders.InProgress')}</Badge>
    case 'FinishedAndNotPaid':
      return <Badge variant="info">{i18n.t('Orders.FinishedAndNotPaid')}</Badge>
    case 'completed':
      return <Badge variant="success">{i18n.t('Orders.Completed')}</Badge>
    default:
      return <Badge variant="info">{i18n.t('Orders.InProgress')}</Badge>
  }
}
