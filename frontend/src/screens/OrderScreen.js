import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions';
import {
  ORDER_PAID_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';

const OrderScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [sdkReady, setSdkReady] = useState(false);

  const orderId = params.id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPaid);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }

    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (successPay || successDeliver) {
      dispatch({ type: ORDER_PAID_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }

    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    order,
    orderId,
    successPay,
    successDeliver,
  ]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const successDeliverHandler = () => {
    dispatch(deliverOrder(orderId));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Pedido {orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Envío</h2>
              <p>
                <strong>Name: {order.user.name}</strong>
              </p>
              <p>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Dirección: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>Enviado</Message>
              ) : (
                <Message variant='danger'>No Enviado</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Método de pago</h2>
              <p>
                <strong>Método: </strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Pagado</Message>
              ) : (
                <Message variant='danger'>No Pagado</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Items del pedido</h2>
              {order.orderItems.length === 0 ? (
                <Message>El pedido està vacío</Message>
              ) : (
                <ListGroup>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} Gs = {item.qty * item.price}{' '}
                          Gs
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Resumen</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{order.itemsPrice} Gs</Col>
                </Row>
                <Row>
                  <Col>Envío</Col>
                  <Col>{order.shippingPrice} Gs</Col>
                </Row>
                <Row>
                  <Col>Impuestos</Col>
                  <Col>{order.taxPrice} Gs</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>{order.totalPrice} Gs</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={successDeliverHandler}
                    >
                      Marcar como entregado
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
