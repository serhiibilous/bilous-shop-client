import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import { buildNotification } from '@Main/utils'
import { Product, Image, ImageContainer, Content } from './public-page-products-components'
import { addNotification } from '@Main/store/notifications/actions'
import { updateUserCart } from '@Main/store/system/actions'
import { NoImage } from '@Main/components'
import { AppState } from '@Main/store'
import { Product as ProductType } from '@Main/types'
import { ProductService, UserService } from '@Main/services'
import { useTranslation } from 'react-i18next'
import { formatMoney } from '@Main/utils'

export default function PublicPageProducts() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { token, loggedIn } = useSelector((state: AppState) => state.system)
  const [products, setProducts] = React.useState<ProductType[]>([])
  const productService = new ProductService()
  const userService = new UserService(token!)

  function handleAddProductToCart(e: any, id: string, name: string) {
    e.preventDefault()
    userService
      .updateUserCart({ action: 'ADD' }, id)
      .then((data) => {
        if (data.products) {
          dispatch(updateUserCart(data.products))
          dispatch(
            addNotification(
              buildNotification(
                'success',
                t('ProductsPage.Notification.ProductAdded.Title'),
                t('ProductsPage.Notification.ProductAdded.Description', { name: name }),
              ),
            ),
          )
        }
      })
      .catch((error) => console.log(error))
  }

  React.useEffect(() => {
    productService
      .getProducts('/products')
      .then((data) => {
        if (data.products) {
          setProducts(data.products)
        }
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <Content>
      <Container>
        <Row>
          {products &&
            products.map((product: ProductType) => {
              const { _id: id, name, description, image, price, oldPrice } = product
              return (
                <Col xs={12} sm={6} md={6} lg={4} xl={3} key={id}>
                  <Product>
                    <ImageContainer>{image ? <Image src={image} alt={name} /> : <NoImage />}</ImageContainer>
                    <Card.Body>
                      <Card.Title title={name}>{name}</Card.Title>
                      <Card.Text>{description}</Card.Text>
                      {loggedIn && (
                        <Button
                          variant="primary"
                          className="w-100"
                          onClick={(e: any) => handleAddProductToCart(e, id, name)}>
                          {t('ProductsPage.AddToCardButton')}
                        </Button>
                      )}
                    </Card.Body>
                    <Card.Footer className="text-center">
                      <span className="font-weight-bold">{formatMoney(price)}</span>
                      {oldPrice && oldPrice !== 0 && <del className="ml-2 text-muted">{formatMoney(oldPrice)}</del>}
                    </Card.Footer>
                  </Product>
                </Col>
              )
            })}
        </Row>
      </Container>
    </Content>
  )
}
