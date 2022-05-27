import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <BrowserRouter>
            <LinkContainer to='/'>
              <Navbar.Brand>Lincoln</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <LinkContainer to='/about'>
                  <Nav.Link>Nosotros</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/contact'>
                  <Nav.Link>Contacto</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav className='ml-auto'>
                <LinkContainer to='/cart'>
                  <Nav.Link>
                    <i className='fas fa-shopping-cart mx-1' />
                    Carrito
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user mx-1' />
                    Iniciar sesión
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </BrowserRouter>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
