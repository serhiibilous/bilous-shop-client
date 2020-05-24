import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addNotification } from '@Main/store/notifications/actions'
import { buildNotification } from '@Main/utils'
import { Link, Redirect } from 'react-router-dom'
import { AppState } from '@Main/store'
import { Category } from '@Main/types'
import { CategoryService } from '@Main/services'
import { useTranslation } from 'react-i18next'

interface Props {
  categoryId?: string
}

export default function AdminCategoryForm({ categoryId }: Props) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const emptyCategoryData: Category = {
    name: '',
    description: '',
    url: '',
  }
  const { token } = useSelector((state: AppState) => state.system)
  const [category, setCategory] = React.useState<Category>(emptyCategoryData)
  const [submitButtonName] = React.useState(
    categoryId ? t('Admin.Category.EditButton') : t('Admin.Category.CreateButton'),
  )
  const [isCategoryUpdated, setIsCategoryUpdated] = React.useState<boolean>(false)
  const categoryService = new CategoryService(token!)

  const handleChangeCategory = (event: any) => {
    event.preventDefault()
    const target = event.target
    const name = target.name
    const value = target.value
    let url = category.url
    if (name === 'name') {
      url = value.toLowerCase().replace(/\s+/g, '-')
    }
    setCategory({ ...category, [name]: target.value, url })
  }

  const handleSubmitForm = (event: any) => {
    event.preventDefault()
    if (categoryId) {
      categoryService
        .updateCategory(categoryId, category)
        .then((data: any) => {
          if (data.errors) {
            Object.keys(data.errors).map((error) => {
              return dispatch(
                addNotification(
                  buildNotification('error', t('Admin.CategoryNotifications.Error.Title'), data.errors[error].message),
                ),
              )
            })
          } else {
            dispatch(
              addNotification(
                buildNotification(
                  'success',
                  t('Admin.CategoryNotifications.SuccessfullyUpdated.Title'),
                  t('Admin.CategoryNotifications.SuccessfullyUpdated.Description', { name: data.category.name }),
                ),
              ),
            )
            setIsCategoryUpdated(true)
          }
        })
        .catch((error) => console.log(error))
    } else {
      categoryService
        .createCategory(category)
        .then((data) => {
          if (data.errors) {
            Object.keys(data.errors).map((error) => {
              return dispatch(
                addNotification(
                  buildNotification(
                    'success',
                    t('Admin.CategoryNotifications.Error.Title'),
                    data.errors[error].message,
                  ),
                ),
              )
            })
          } else {
            dispatch(
              addNotification(
                buildNotification(
                  'success',
                  t('Admin.CategoryNotifications.SuccessfullyCreated.Title'),
                  t('Admin.CategoryNotifications.SuccessfullyCreated.Description', { name: data.category.name }),
                ),
              ),
            )
            setIsCategoryUpdated(true)
          }
        })
        .catch((error) => console.log(error))
    }
  }

  React.useEffect(() => {
    if (categoryId) {
      categoryService
        .getCategory(categoryId)
        .then((data) => {
          if (data.category) {
            setCategory({
              name: data.category.name,
              description: data.category.description,
              url: data.category.url,
            })
          }
        })
        .catch((error) => console.log(error))
    }
  }, [])

  return (
    <>
      {isCategoryUpdated ? <Redirect to={`/admin/categories`} /> : null}
      <Form onSubmit={handleSubmitForm}>
        <Form.Group controlId="name">
          <Form.Label>{t('Admin.Category.Name')}:</Form.Label>
          <Form.Control
            value={category.name}
            name="name"
            type="text"
            onChange={handleChangeCategory}
            placeholder={t('Admin.Category.Name')}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>{t('Admin.Category.Description')}:</Form.Label>
          <Form.Control
            value={category.description}
            name="description"
            type="text"
            onChange={handleChangeCategory}
            placeholder={t('Admin.Category.Description')}
          />
        </Form.Group>
        <Form.Group controlId="url">
          <Form.Label>
            {t('Admin.Category.Url')} ({t('Admin.Category.UrlInfo')})*:
          </Form.Label>
          <Form.Control
            value={category.url}
            name="url"
            type="text"
            onChange={handleChangeCategory}
            placeholder={t('Admin.Category.Url')}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit">{submitButtonName}</Button>
        </Form.Group>
      </Form>
      <hr />
      <Link to="/admin/categories">{t('Admin.Category.ButtonBackToCategories')}</Link>
    </>
  )
}
