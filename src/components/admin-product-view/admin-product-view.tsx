import React from 'react'
import { Container, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import { ImageContainer, Content, Title } from './admin-product-view-components'
import { AppState } from '@Main/store'
import { Product } from '@Main/types'
import { ProductService } from '@Main/services'

export default function AdminProductView({ match }: any) {
  const { token } = useSelector((state: AppState) => state.system)
  const [product, setProduct] = React.useState<Product>()
  const productService = new ProductService(token!)

  React.useEffect(() => {
    productService
      .getProduct(match.params.id)
      .then(data => {
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
      .catch(error => console.log(error))
  }, [])

  return (
    <Content>
      <Container>
        <Title>Продукт:</Title>
        {product && (
          <>
            <ListGroup>
              <ListGroup.Item>
                <span className="font-weight-bold">Назва:</span> {product.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="font-weight-bold">Опис:</span> {product.description}
              </ListGroup.Item>
              <ListGroup.Item>
                <span className="font-weight-bold">Ціна:</span> {product.price} грн.
              </ListGroup.Item>
              {product.oldPrice !== 0 && (
                <ListGroup.Item>
                  <span className="font-weight-bold">Стара ціна:</span> {product.oldPrice} грн.
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <span className="font-weight-bold">Категорія:</span> {product.category}
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
            <div className="d-flex justify-content-between">
              <Link className="btn btn-primary" to="/admin/products">
                Повернутися до списку продуктів
              </Link>
              <Link className="btn btn-primary" to={`/admin/product/edit/${product._id}`}>
                Редагувати продукт
              </Link>
            </div>
          </>
        )}
      </Container>
    </Content>
  )
}
