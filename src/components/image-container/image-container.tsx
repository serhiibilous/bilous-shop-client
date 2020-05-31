import React, { useState } from 'react'
import { NoImage } from '@Main/components'
import { Container } from './image-container-components'

interface ImageInterface {
  url?: string
  name?: string
}

export default function ImageContainer({ url = '', name }: ImageInterface) {
  const [hasError, setHasError] = useState<boolean>(Boolean(url))
  const [imageUrl] = useState<string>(url)

  const handleError = () => {
    setHasError(true)
  }

  return <Container>{hasError ? <img src={imageUrl} alt={name} onError={handleError} /> : <NoImage />}</Container>
}
