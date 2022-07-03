import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

const HeroSection = () => {
  return (
    <section className='d-flex flex-row justify-content-end align-items-end hero-section'>
      <Container>
        <div className='py-4'>
          <Row>
            <Col>
              <h1>Bienvenido a Bookommerce</h1>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <p>
                Bookommerce es una aplicación de muestra, enfocada en la venta
                de libros. Todas las transacciones se pueden realizar sin costos
                ya que corren en modo sandbox.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                type='button'
                variant='primary'
                href='#about'
                className='mb-2'
                style={{ marginRight: '10px' }}
              >
                Màs información
              </Button>
              <Button type='button' variant='secondary' className='mb-2'>
                Contacto
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
