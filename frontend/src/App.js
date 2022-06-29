import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import AboutScreen from './screens/AboutScreen';
import GenresScreen from './screens/GenresScreen';
import GenresListScreen from './screens/GenresListScreen';
import AuthorListScreen from './screens/AuthorListScreen';
import AuthorScreen from './screens/AuthorScreen';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
          </Routes>
          <Container className='py-3'>
            <Routes>
              <Route path='/product/:id' element={<ProductScreen />} />
              <Route path='/cart/'>
                <Route path=':id' element={<CartScreen />} />
                <Route path='' element={<CartScreen />} />
              </Route>
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/shipping' element={<ShippingScreen />} />
              <Route path='/payment' element={<PaymentScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/order/:id' element={<OrderScreen />} />
              <Route path='/admin/userList' element={<UserListScreen />} />
              <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
              <Route path='/admin/productsList' element={<ProductListScreen />}>
                <Route path=':pageNumber' element={<ProductListScreen />} />
                <Route path='' element={<ProductListScreen />} />
              </Route>
              <Route
                path='/admin/product/:id/edit'
                element={<ProductEditScreen />}
              />
              <Route path='/admin/ordersList' element={<OrderListScreen />} />
              <Route path='/search/:keyword' element={<HomeScreen />} />
              <Route path='/page/:pageNumber' element={<HomeScreen />} />
              <Route
                path='/search/:keyword/page/:pageNumber'
                element={<HomeScreen />}
              />

              <Route path='/admin/genresList' element={<GenresListScreen />} />
              <Route path='/admin/genres/new' element={<GenresScreen />} />
              <Route path='/admin/genres/:id/edit' element={<GenresScreen />} />
              <Route path='/admin/authorsList' element={<AuthorListScreen />} />
              <Route path='/admin/authors/new' element={<AuthorScreen />} />
              <Route path='/about' element={<AboutScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
