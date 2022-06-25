import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const HeroSection = () => {
  return (
    <section className='d-flex flex-row justify-content-end align-items-end hero-section'>
      <div className='p-3 mb-5'>
        <Row style={{ textAlign: 'right' }}>
          <Col>
            <h1>Bienvenido a Bookommerce</h1>
          </Col>
        </Row>
        <Row className='d-flex flex-row justify-content-end align-items-end'>
          <Col md={6}>
            <p>
              Bookommerce es una aplicación de muestra, enfocada en la venta de
              libros. Todas las transacciones se pueden realizar sin costos ya
              que corren en modo sandbox. Ante cualquier comentario (o si
              encuentras algún bug), no dude en utilizar el contacto.
            </p>
          </Col>
        </Row>
        <Row style={{ textAlign: 'right' }}>
          <Col>
            <Button
              type='button'
              variant='primary'
              className='mx-2'
              href='#about'
            >
              Màs información
            </Button>
            <Button type='button' variant='secondary'>
              Ver productos
            </Button>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default HeroSection;
