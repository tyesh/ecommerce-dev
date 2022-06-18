import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>Iniciar sesión</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Iniciar sesión</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Envío</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Envío</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>Pagos</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Pagos</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>Colocar Pedido</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Colocar Pedido</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
