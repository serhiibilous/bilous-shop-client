import styled from 'styled-components'
import { Card } from 'react-bootstrap'
import { secondaryLight } from '@Main/styles/colors'

export const Content = styled.div`
  padding: 20px 0;
`

export const ProductCategory = styled.div`
  border-bottom: 1px solid ${secondaryLight};
  margin: 20px 0 30px;

  &:last-child {
    border: 0;
  }
`

export const ProductCategoryTitle = styled.h2`
  font-size: 28px;
  margin: 0 0 20px;
  font-weight: 700;
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
  padding: 10px;
`
