import React from 'react'
import { Container, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import { ImageContainer, Content, Title } from './admin-product-view-components'
import { AppState } from '@Main/store'
import { Product } from '@Main/types'
import { ProductService } from '@Main/services'
import { useTranslation } from 'react-i18next'
import { formatMoney } from '@Main/utils'

export default function AdminProductView() {
  const { id } = useParams()
  const { t } = useTranslation()
  const { token } = useSelector((state: AppState) => state.system)
  const [product, setProduct] = React.useState<Product>()
  const productService = new ProductService(token!)

  React.useEffect(() => {
    productService
      .getProduct(id)
      .then((data) => {
        if (data.product) {
          setProduct({
            _id: data.product._id,
            name: data.product.name,
            description: data.product.description,
            price: data.product.price,
            oldPrice: data.product.oldPrice ? data.product.oldPrice : 0,
            category: data.product.category.name,
            image: data.product.image,
          })
        }
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <Content>
      <Container>
        <Title>{t('Admin.ViewProductPage.Title')}</Title>
        {product && (
          <>
            <ListGroup>
              <ListGroup.Item>
                <span className="font-weight-bold">{t('Admin.Product.Name')}:</span> {product.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="font-weight-bold">{t('Admin.Product.Description')}:</span> {product.description}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="font-weight-bold">{t('Admin.Product.Price')}:</span> {formatMoney(product.price)}
              </ListGroup.Item>
              {product.oldPrice !== 0 && (
                <ListGroup.Item>
                  <span className="font-weight-bold">{t('Admin.Product.OldPrice')}:</span>{' '}
                  {formatMoney(product.oldPrice)}
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <span className="font-weight-bold">{t('Admin.Product.Category')}:</span> {product.category}
              </ListGroup.Item>
              {product.image && (
                <ListGroup.Item>
                  <ImageContainer>
                    <Image src={product.image} alt={product.name} thumbnail />
                  </ImageContainer>
                </ListGroup.Item>
              )}
            </ListGroup>
            <br />
            <div className="d-flex">
              <Link className="btn btn-primary" to={`/admin/product/edit/${product._id}`}>
                {t('Admin.ViewProductPage.EditProductButton')}
              </Link>
            </div>
          </>
        )}
        <hr />
        <Link to="/admin/products">{t('Admin.ViewProductPage.LinkBackToProducts')}</Link>
      </Container>
    </Content>
  )
}
