import React from 'react'
import { Button, Form, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '@Main/store/notifications/actions'
import { buildNotification } from '@Main/utils'
import { Redirect } from 'react-router-dom'
import { ImageContainer } from './admin-product-form-components'
import { AppState } from '@Main/store'
import { Product, Category } from '@Main/types'
import { ProductService, CategoryService } from '@Main/services'

interface Props {
  method: string
  productId?: string
}

export default function AdminProductForm({ productId }: Props) {
  const dispatch = useDispatch()
  const { token } = useSelector((state: AppState) => state.system)
  const [loading, setLoading] = React.useState(false)
  const [product, setProduct] = React.useState<Product>({
    _id: '',
    name: 'name',
    description: 'description',
    price: 10,
    oldPrice: 20,
    category: 'Beer',
    image: '',
  })
  const [imageFile, setImageFile] = React.useState<string>('')
  const [categories, setCategories] = React.useState<Category[]>([])
  const [buttonName] = React.useState(productId ? 'Редагувати' : 'Створити')
  const [createdProductId, setCreatedProductId] = React.useState<string | null>(null)
  const method: 'PATCH' | 'POST' = productId ? 'PATCH' : 'POST'
  const productService = new ProductService(token!)
  const categoryService = new CategoryService(token!)

  function handleChange(event: any) {
    const target = event.target
    const name = target.name
    setProduct({ ...product, [name]: target.value })
  }

  const handleRemoveImage = () => {
    setProduct({ ...product, image: '' })
    setImageFile('')
  }

  const handleChangeImage = (event: any) => {
    const image = event.target.files[0]
    if (image) {
      setImageFile(image)
      setProduct({ ...product, image: URL.createObjectURL(event.target.files[0]) })
    } else {
      setProduct({ ...product, image: '' })
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    const url = productId ? `/product/${productId}` : '/product'
    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('description', product.description)
    formData.append('price', product.price.toString())
    formData.append('oldPrice', product.oldPrice.toString())
    formData.append('category', product.category)
    formData.append('image', imageFile ? imageFile : product.image)

    productService
      .createUpdateFormDataResource(url, formData, method)
      .then(data => {
        setLoading(false)
        if (data.errors) {
          Object.keys(data.errors).map(error => {
            return dispatch(addNotification(buildNotification('error', 'Помилка валідації', data.errors[error].message)))
          })
        } else if (data.product) {
          const messageText = productId ? 'Редаговано продукт:' : 'Створено продукт:'
          dispatch(addNotification(buildNotification('success', messageText, data.product.name)))
          setCreatedProductId(data.product._id)
        } else {
          console.log(data)
        }
      })
      .catch(error => console.log(error))
  }

  React.useEffect(() => {
    categoryService
      .getCategories()
      .then(data => {
        if (data.categories) {
          setCategories(data.categories)
        }
      })
      .catch(error => console.log(error))

    if (productId) {
      productService
        .getProduct(productId)
        .then(data => {
          if (data.product) {
            setProduct({
              _id: '',
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
    }
  }, [])

  return (
    <>
      <div>{loading && <div>Loading...</div>}</div>
      {createdProductId ? <Redirect to={`/admin/product/view/${createdProductId}`} /> : null}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productName">
          <Form.Label>Ім'я:</Form.Label>
          <Form.Control value={product.name} name="name" type="text" onChange={handleChange} placeholder="Ім'я" />
        </Form.Group>
        <Form.Group controlId="productDescription">
          <Form.Label>Опис:</Form.Label>
          <Form.Control
            value={product.description}
            name="description"
            type="text"
            onChange={handleChange}
            placeholder="Опис"
          />
        </Form.Group>
        <Form.Group controlId="productPrice">
          <Form.Label>Ціна:</Form.Label>
          <Form.Control
            required={true}
            value={product.price.toString()}
            name="price"
            type="number"
            onChange={handleChange}
            placeholder="Ціна"
          />
        </Form.Group>
        <Form.Group controlId="productOldPrice">
          <Form.Label>Стара ціна:</Form.Label>
          <Form.Control
            value={product.oldPrice.toString()}
            name="oldPrice"
            type="number"
            onChange={handleChange}
            placeholder="Стара ціна"
          />
        </Form.Group>
        <Form.Group controlId="productCategory">
          <Form.Label>Категорія:</Form.Label>
          <Form.Control required={true} value={product.category} name="category" onChange={handleChange} as="select">
            {categories &&
              categories.map(category => {
                return (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                )
              })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="productImage">
          <Form.Label>Фото:</Form.Label>
          <Form.Control name="image" type="file" onChange={handleChangeImage} placeholder="Фото" />
        </Form.Group>
        {product.image && product.image.length > 0 && (
          <>
            <Form.Group controlId="productImage">
              <ImageContainer>
                <Image src={product.image} alt={product.name} thumbnail />
              </ImageContainer>
            </Form.Group>
            <Form.Group>
              <button onClick={handleRemoveImage}>Remove Image</button>
            </Form.Group>
          </>
        )}
        <Form.Group>
          <Button type="submit">{buttonName}</Button>
        </Form.Group>
      </Form>
    </>
  )
}
