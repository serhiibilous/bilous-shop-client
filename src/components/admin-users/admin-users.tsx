import React, { Fragment, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from '@Main/store'
import { User } from '@Main/types'
import { UserService } from '@Main/services'
import { useTranslation } from 'react-i18next'
import { PageTitle, TableContainer } from '@Main/styles/admin'

export default function AdminUsers() {
  const { t } = useTranslation()
  const { token } = useSelector((state: AppState) => state.system)
  const userService = new UserService(token!)
  const [users, setUsers] = useState<User[]>([])

  React.useEffect(() => {
    userService
      .getUsers()
      .then((data: User[]) => {
        if (data) {
          setUsers(data)
        }
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center">
        <PageTitle>{t('Admin.UsersPage.Title')}</PageTitle>
        <Link to="/admin/user/new" className="btn btn-primary d-none">
          {t('Admin.UsersPage.ButtonCreate')}
        </Link>
      </div>

      <Fragment>
        {users.length > 0 && (
          <TableContainer>
            <Table bordered striped responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{t('Admin.UsersPage.Table.Name')}</th>
                  <th>{t('Admin.UsersPage.Table.Company')}</th>
                  <th>{t('Admin.UsersPage.Table.Actions')}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.company}</td>
                      <td className="d-flex justify-content-between align-items-center">
                        <Link className="btn btn-info" to={`/admin/user/view/${user._id}`}>
                          {t('Admin.UsersPage.Table.ViewButton')}
                        </Link>{' '}
                        |
                        <Link className="btn btn-primary" to={`/admin/user/edit/${user._id}`}>
                          {t('Admin.UsersPage.Table.EditButton')}
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
  )
}
