import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Alert, Button, Carousel } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { NoImage } from '@Main/components'
import { Product } from '@Main/types'
import { ProductService } from '@Main/services'
import {
  Content,
  ButtonContainer,
  ImageContainer,
  Image,
  CarouselTitle,
  CarouselControlNext,
  CarouselControlPrev,
} from './page-home-components'

export default function PageHome() {
  const { t } = useTranslation()
  const [latestProducts, setLatestProducts] = useState<Product[]>([])
  const productService = new ProductService()

  React.useEffect(() => {
    productService
      .getProducts('/products?limit=5')
      .then((data) => {
        if (data.products) {
          setLatestProducts(data.products)
        }
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <Content>
      <Container>
        <Alert variant="success">
          <Alert.Heading>Як ми працюємо:</Alert.Heading>
          <ul>
            <li>Зробіть замовлення протягом тижня в будь-який зручний час.</li>
            <li>
              Отримайте доставку в офіс в п'ятницю о 16:00.
              <br />
              <em>(останнє замовлення приймається до 14:00 п'ятниці)</em>
            </li>
          </ul>
        </Alert>
      </Container>
      <Container>
        <ButtonContainer>
          <LinkContainer to="/products">
            <Button variant="success" size="lg" block>
              {t('HomePage.AllProducts')}
            </Button>
          </LinkContainer>
        </ButtonContainer>
      </Container>
      {latestProducts && (
        <Container>
          <hr />
          <CarouselTitle>{t('HomePage.Slider.Title')}</CarouselTitle>
          <Carousel nextIcon={<CarouselControlNext />} prevIcon={<CarouselControlPrev />}>
            {latestProducts.map((product: any) => {
              const { _id: id, name, description, image } = product
              return (
                <Carousel.Item key={id}>
                  <ImageContainer>{image ? <Image src={image} alt={name} /> : <NoImage />}</ImageContainer>
                  <Carousel.Caption>
                    <h3>{name}</h3>
                    <p>{description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              )
            })}
          </Carousel>
        </Container>
      )}
    </Content>
  )
}
