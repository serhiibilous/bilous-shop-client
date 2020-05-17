import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Table } from 'react-bootstrap'
import { Content, Title, TableContainer } from './admin-product-categories-components'
import { AppState } from '@Main/store'
import { Category } from '@Main/types'
import { CategoryService } from '@Main/services'
import { addNotification } from '@Main/store/notifications/actions'
import { buildNotification } from '@Main/utils'

function AdminProductCategories() {
  const dispatch = useDispatch()
  const { token } = useSelector((state: AppState) => state.system)
  const [categories, setCategories] = React.useState<Category[]>([])
  const categoryService = new CategoryService(token!)

  function handleDeleteCategory(event: any, id: string) {
    event.preventDefault()
    categoryService
      .deleteCategory(id)
      .then((data: any) => {
        if (data.category) {
          const updatedCategories = categories.filter((category: any) => category._id !== data.category._id)
          setCategories(updatedCategories)
          dispatch(
            addNotification(
              buildNotification(
                'success',
                'Категорію видалена!',
                `Ви успішно видалили категорію - ${data.category.name}.`
              )
            )
          )
        } else {
          console.log('Error with deleting category!')
        }
      })
      .catch(error => console.log(error))
  }

  React.useEffect(() => {
    categoryService
      .getCategories()
      .then((data: any) => {
        if (data.categories) {
          setCategories(data.categories)
        } else {
          console.log(data)
        }
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <Content>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <Title>Категорії продуктів</Title>
          <Link className="btn btn-primary" to="/admin/categories/new">
            Створити нову категорію
          </Link>
        </div>
        {categories && (
          <TableContainer>
            <Table bordered striped responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Назва</th>
                  <th>Опис</th>
                  <th>URL</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category: Category, index: number) => {
                  return (
                    <tr key={category._id}>
                      <td>{index + 1}</td>
                      <td>{category.name}</td>
                      <td>{category.description}</td>
                      <td>
                        <code>{category.url}</code>
                      </td>
                      <td className="d-flex justify-content-between align-items-center">
                        <Link className="btn btn-primary" to={`/admin/categories/edit/${category._id}`}>
                          Редагувати
                        </Link>{' '}
                        |
                        <Link
                          to="#"
                          className="btn btn-danger"
                          style={{ cursor: 'pointer' }}
                          onClick={event => handleDeleteCategory(event, category._id!)}>
                          Видалити
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Content>
  )
}

export default AdminProductCategories
