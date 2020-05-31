import React from 'react'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '@Main/store/notifications/actions'
import { buildNotification } from '@Main/utils'
import { AppState } from '@Main/store'
import { Product } from '@Main/types'
import { ProductService } from '@Main/services'
import { useTranslation } from 'react-i18next'
import { PageTitle, TableContainer } from '@Main/styles/admin'

export default function AdminProducts() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { token } = useSelector((state: AppState) => state.system)
  const [products, setProducts] = React.useState<Product[]>([])
  const productService = new ProductService(token!)

  const handleDeleteProduct = (event: any, id: string) => {
    event.preventDefault()
    productService
      .deleteProduct(id)
      .then((data) => {
        if (data.product) {
          setProducts(products.filter((product) => product._id !== data.product._id))
          dispatch(
            addNotification(
              buildNotification(
                'info',
                t('Admin.ProductNotifications.Success.DeletedTitle'),
                t('Admin.ProductNotifications.Success.Description', { name: data.product.name }),
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
    <>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <PageTitle>{t('Admin.ProductsPage.Title')}</PageTitle>
          <Link to="/admin/product/new" className="btn btn-primary">
            {t('Admin.ProductsPage.ButtonCreate')}
          </Link>
        </div>
        <>
          {products.length > 0 && (
            <TableContainer>
              <Table bordered striped responsive="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t('Admin.ProductsPage.Table.Name')}</th>
                    <th>{t('Admin.ProductsPage.Table.Category')}</th>
                    <th>{t('Admin.ProductsPage.Table.Price')}</th>
                    <th>{t('Admin.ProductsPage.Table.Actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => {
                    return (
                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.category.name}</td>
                        <td>{product.price ? product.price : product.oldPrice} грн.</td>
                        <td className="d-flex justify-content-between">
                          <Link className="btn btn-info" to={`/admin/product/view/${product._id}`}>
                            {t('Admin.ProductsPage.Table.ViewButton')}
                          </Link>
                          <Link className="btn btn-primary" to={`/admin/product/edit/${product._id}`}>
                            {t('Admin.ProductsPage.Table.EditButton')}
                          </Link>
                          <Link className="btn btn-danger" to="#" onClick={(e) => handleDeleteProduct(e, product._id)}>
                            {t('Admin.ProductsPage.Table.DeleteButton')}
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </TableContainer>
          )}
        </>
      </Container>
    </>
  )
}
