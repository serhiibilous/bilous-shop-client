import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Table } from 'react-bootstrap'
import { AppState } from '@Main/store'
import { Category } from '@Main/types'
import { CategoryService } from '@Main/services'
import { addNotification } from '@Main/store/notifications/actions'
import { buildNotification } from '@Main/utils'
import { useTranslation } from 'react-i18next'
import { PageTitle, TableContainer } from '@Main/styles/admin'

export default function AdminProductCategories() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { token } = useSelector((state: AppState) => state.system)
  const [categories, setCategories] = React.useState<Category[]>([])
  const categoryService = new CategoryService(token!)

  function handleDeleteCategory(event: any, id: string) {
    event.preventDefault()
    categoryService
      .deleteCategory(id)
      .then((data) => {
        if (data.category) {
          const updatedCategories = categories.filter((category: any) => category._id !== data.category._id)
          setCategories(updatedCategories)
          dispatch(
            addNotification(
              buildNotification(
                'success',
                t('Admin.CategoryNotifications.SuccessfullyDeleted.Title'),
                t('Admin.CategoryNotifications.SuccessfullyDeleted.Description', { name: data.category.name }),
              ),
            ),
          )
        }
      })
      .catch((error) => console.log(error))
  }

  React.useEffect(() => {
    categoryService
      .getCategories()
      .then((data) => {
        if (data.categories) {
          setCategories(data.categories)
        }
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <PageTitle>{t('Admin.CategoriesPage.Title')}</PageTitle>
          <Link className="btn btn-primary" to="/admin/categories/new">
            {t('Admin.CategoriesPage.CreateButton')}
          </Link>
        </div>
        {categories.length > 0 && (
          <TableContainer>
            <Table bordered striped responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t('Admin.Category.Name')}</th>
                  <th>{t('Admin.Category.Description')}</th>
                  <th>{t('Admin.Category.Url')}</th>
                  <th>{t('Admin.Category.Actions')}</th>
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
                          {t('Admin.CategoriesPage.EditButton')}
                        </Link>
                        <Link
                          to="#"
                          className="btn btn-danger"
                          onClick={(event) => handleDeleteCategory(event, category._id!)}>
                          {t('Admin.CategoriesPage.DeleteButton')}
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
    </>
  )
}
