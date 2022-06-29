import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('paypal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod({ paymentMethod }));
    navigate('/placeorder');
  };

  useEffect(() => {
    if (!userInfo) {
      navigate(`/login?redirect=payment`);
    }
  }, [userInfo, navigate]);

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Método de pago</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Seleccionar método</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credi Card'
              id='Paypal'
              name='paymentMethod'
              value='Paypal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary' className='my-3'>
          Siguiente
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
