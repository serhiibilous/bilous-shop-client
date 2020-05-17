import styled from 'styled-components'
import { Card } from 'react-bootstrap'

export const Content = styled.div`
  margin: 30px 0;
`

export const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Product = styled(Card)`
  margin: 0 0 20px;
`

export const Title = styled.h1`
  margin: 30px 0 20px;
`

export const ImageContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`

export const Image = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 100%;
  display: block;
`
