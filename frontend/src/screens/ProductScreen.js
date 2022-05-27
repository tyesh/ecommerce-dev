import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useParams } from 'react-router';
import axios from 'axios';

const ProductScreen = () => {
  const params = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get(`/api/products/${params.id}`).then(({ data }) => {
      setProduct(data);
    });
  }, [params.id]);

  return (
    <div>
      <Link className='btn btn-light my-3 ' to='/'>
        Atrás
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} revisiones`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Precio {product.price}Gs</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Precio: </Col>
                  <Col>
                    <strong>{product.price}Gs</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Estado: </Col>
                  <Col>
                    {product.countInStock > 0 ? 'En stock' : 'Sin stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Agregar al carrito
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
