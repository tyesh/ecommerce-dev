import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Envío</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type='address'
            placeholder='Ingrese nombre'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type='city'
            placeholder='Ingrese ciudad'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>Código Postal</Form.Label>
          <Form.Control
            type='postalCode'
            placeholder='Ingrese código postal'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>País</Form.Label>
          <Form.Control
            type='country'
            placeholder='Ingrese país'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </Form.Group>
        <Button type='submit' variant='primary' className='my-3'>
          Siguiente
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
