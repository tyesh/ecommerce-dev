import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {
  createteProduct,
  deleteProduct,
  listProducts,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { useParams } from 'react-router-dom';

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const pageNumber = params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createProductHandler = () => {
    dispatch(createteProduct());
  };

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate('/login');
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Seguro?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Productos</h1>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus' />
            &nbsp;Crear Producto
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Destacado?</th>
                <th>Categoría</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    {product.highlight ? (
                      <i className='fas fa-check' style={{ color: 'green' }} />
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>{product.category}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit' />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash' />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
