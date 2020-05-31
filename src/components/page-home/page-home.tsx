import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Button, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ImageContainer as Image, PublicPageContainer } from '@Main/components'
import { Product } from '@Main/types'
import { ProductService } from '@Main/services'
import {
  Content,
  ButtonContainer,
  ImageContainer,
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
    <PublicPageContainer>
      <Content>
        {latestProducts && (
          <Container>
            <CarouselTitle>{t('HomePage.Slider.Title')}</CarouselTitle>
            <Carousel nextIcon={<CarouselControlNext />} prevIcon={<CarouselControlPrev />}>
              {latestProducts.map((product: any) => {
                const { _id: id, name, description, image } = product
                return (
                  <Carousel.Item key={id}>
                    <ImageContainer>
                      <Image url={image} name={name} />
                    </ImageContainer>
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
      <Container>
        <ButtonContainer>
          <Link to="/products">
            <Button variant="success" size="lg" block>
              {t('HomePage.AllProducts')}
            </Button>
          </Link>
        </ButtonContainer>
      </Container>
    </PublicPageContainer>
  )
}
