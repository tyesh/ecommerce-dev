import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimals(0);

  cart.taxPrice = addDecimals(Number((0.1 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreated = useSelector((state) => state.orderCreated);
  const { order, success, error } = orderCreated;

  useEffect(() => {
    if (success) {
      navigate(`order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [navigate, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Envío</h2>
              <p>
                <strong>Dirección: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Método de pago</h2>
              <strong>Método: </strong> {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Items del pedido</h2>
              {cart.cartItems.length === 0 ? (
                <Message>El carrtio està vacío</Message>
              ) : (
                <ListGroup>
                  {cart.cartItems.map((item, index) => (
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
                  <Col>{cart.itemsPrice} Gs</Col>
                </Row>
                <Row>
                  <Col>Envío</Col>
                  <Col>{cart.shippingPrice} Gs</Col>
                </Row>
                <Row>
                  <Col>Impuestos</Col>
                  <Col>{cart.taxPrice} Gs</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>{cart.totalPrice} Gs</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Confirmar Pedido
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
