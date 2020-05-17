import React, { Fragment, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { TableContainer, Title } from '@Main/components/admin-products/admin-products-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from '@Main/store'
import { User } from '@Main/types'
import { UserService } from '@Main/services'

export default function AdminUsers() {
  const { token } = useSelector((state: AppState) => state.system)
  const userService = new UserService(token!)
  const [users, setUsers] = useState<User[]>([])

  React.useEffect(() => {
    userService.getUsers().then((data: User[]) => {
      if (data) {
        setUsers(data)
      } else {
        console.log(data)
      }
    })
  }, [])

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center">
        <Title>Користувачі</Title>
        <Link to="/admin/user/new" className="btn btn-primary d-none">
          Створити нового юзера
        </Link>
      </div>

      <Fragment>
        {users.length > 0 && (
          <TableContainer>
            <Table bordered striped responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ім'я</th>
                  <th>Компанія</th>
                  <th>Дії</th>
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
                          Переглянути
                        </Link>{' '}
                        |
                        <Link className="btn btn-primary" to={`/admin/user/edit/${user._id}`}>
                          Редагувати
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
