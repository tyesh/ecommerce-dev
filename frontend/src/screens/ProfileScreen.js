import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { getUserOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const userOrders = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = userOrders;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(getUserOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, dispatch, navigate, user, success]);

  return (
    <Row>
      <Col md={3}>
        <h1 className='h2'>Mi perfil</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Perfil Actualizado</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='name'
              placeholder='Ingrese nombre'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Ingrese email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type='password'
              placeholder='Ingrese contraseña'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirme contraseña'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button className='my-3' type='submit' variant='primary'>
            Actualizar
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Mis Pedidos</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Pagado?</th>
                <th>Entregado?</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.isDelivered.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light'>Detalles</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
