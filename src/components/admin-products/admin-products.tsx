import React, { Fragment } from 'react'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '@Main/store/notifications/actions'
import { buildNotification } from '@Main/utils'
import { TableContainer, Content, Title } from './admin-products-components'
import { AppState } from '@Main/store'
import { Product } from '@Main/types'
import { ProductService } from '@Main/services'

export default function AdminProducts() {
  const dispatch = useDispatch()
  const { token } = useSelector((state: AppState) => state.system)
  const [products, setProducts] = React.useState<Product[]>([])
  const productService = new ProductService(token!)

  const handleDeleteProduct = (event: any, id: string) => {
    event.preventDefault()
    productService
      .deleteProduct(id)
      .then(data => {
        if (data.product) {
          setProducts(products.filter(product => product._id !== data.product._id))
          dispatch(
            addNotification(buildNotification('info', 'Продукт: ' + data.product.name, 'Продукт успішно видалено.'))
          )
        }
      })
      .catch(error => console.log(error))
  }

  React.useEffect(() => {
    productService
      .getProducts('/products')
      .then(data => {
        if (data.products) {
          setProducts(data.products)
        }
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <Content>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <Title>Продукти</Title>
          <Link to="/admin/product/new" className="btn btn-primary">
            Create new Product
          </Link>
        </div>

        <Fragment>
          {products.length > 0 && (
            <TableContainer>
              <Table bordered striped responsive="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Назва</th>
                    <td>Ціна</td>
                    <th>Дії</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => {
                    return (
                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.price ? product.price : product.oldPrice} грн.</td>
                        <td className="d-flex justify-content-between">
                          <Link className="btn btn-info" to={`/admin/product/view/${product._id}`}>
                            View product
                          </Link>
                          <Link className="btn btn-primary" to={`/admin/product/edit/${product._id}`}>
                            Edit product
                          </Link>
                          <Link className="btn btn-danger" to="#" onClick={e => handleDeleteProduct(e, product._id)}>
                            Delete Product
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </TableContainer>
          )}
        </Fragment>
      </Container>
    </Content>
  )
}
