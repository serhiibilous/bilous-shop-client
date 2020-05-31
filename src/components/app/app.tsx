import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@Main/store'

// Helpers
import { PrivateRoute, PublicRoute, Authorization } from '@Main/helpers'

// Components
import {
  PageHome,
  AdminPageContainer,
  AdminPageHome,
  AdminProductCategories,
  AdminProductCategoriesNew,
  AdminProductCategoriesEdit,
  PublicPageProducts,
  Header,
  PageContainer,
  UserCart,
  PageLogin,
  UserProfile,
  UserCheckout,
  AdminOrders,
  UserOrders,
  UserHome,
  UserPageContainer,
  Notifications,
  PageNotFound,
  PageSignUp,
  AdminProductNew,
  AdminProductEdit,
  AdminProducts,
  AdminProductView,
  AdminUserEdit,
  AdminUsers,
  Loader,
  GlobalStyle,
} from '@Main/components'

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <Router>
          <Authorization>
            <PageContainer>
              <GlobalStyle />
              <Header />
              <Notifications />
              <Switch>
                <Route path="/" exact component={PageHome} />
                <PublicRoute path="/login" exact component={PageLogin} />
                <PublicRoute path="/sign-up" exact component={PageSignUp} />
                <Route exact path="/products" component={PublicPageProducts} />

                <Route path="/user">
                  <UserPageContainer>
                    <PrivateRoute exact path="/user/home" component={UserHome} />
                    <PrivateRoute exact path="/user/profile" component={UserProfile} />
                    <PrivateRoute exact path="/user/cart" component={UserCart} />
                    <PrivateRoute exact path="/user/checkout" component={UserCheckout} />
                    <PrivateRoute exact path="/user/orders" component={UserOrders} />
                  </UserPageContainer>
                </Route>

                <Route path="/admin">
                  <AdminPageContainer>
                    <PrivateRoute exact path="/admin/home" component={AdminPageHome} />
                    <PrivateRoute exact path="/admin/products" component={AdminProducts} />
                    <PrivateRoute exact path="/admin/product/edit/:id" component={AdminProductEdit} />
                    <PrivateRoute exact path="/admin/product/new" component={AdminProductNew} />
                    <PrivateRoute exact path="/admin/product/view/:id" component={AdminProductView} />
                    <PrivateRoute exact path="/admin/users" component={AdminUsers} />
                    <PrivateRoute exact path="/admin/user/edit/:id" component={AdminUserEdit} />
                    <PrivateRoute exact path="/admin/categories" component={AdminProductCategories} />
                    <PrivateRoute exact path="/admin/categories/new" component={AdminProductCategoriesNew} />
                    <PrivateRoute exact path="/admin/categories/edit/:id" component={AdminProductCategoriesEdit} />
                    <PrivateRoute exact path="/admin/orders" component={AdminOrders} />
                  </AdminPageContainer>
                </Route>

                <Route component={PageNotFound} />
              </Switch>

              {/*<Footer />*/}
            </PageContainer>
          </Authorization>
        </Router>
      </Provider>
    </Suspense>
  )
}
