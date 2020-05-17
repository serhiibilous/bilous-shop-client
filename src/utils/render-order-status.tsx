import React from 'react'
import { Badge } from 'react-bootstrap'

export function RenderOrderStatus(status: string) {
  switch (status) {
    case 'inProgress':
      return <Badge variant="info">In Progress</Badge>
    case 'FinishedAndNotPaid':
      return <Badge variant="info">In Progress</Badge>
    case 'completed':
      return <Badge variant="success">Completed</Badge>
    default:
      return <Badge variant="info">In progress</Badge>
  }
}
