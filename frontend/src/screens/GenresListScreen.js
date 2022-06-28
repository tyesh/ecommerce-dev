import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { useParams } from 'react-router-dom';
import { GENRE_LIST_RESET } from '../constants/genreConstants';
import { listGenres } from '../actions/genreActions';

const GenresListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const pageNumber = params.pageNumber || 1;

  const genreList = useSelector((state) => state.genreList);
  const { loading, error, genres, page, pages } = genreList;

  /*const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;*/

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: GENRE_LIST_RESET });
    if (!userInfo.isAdmin) {
      navigate('/login');
    }
    dispatch(listGenres('', pageNumber));
  }, [dispatch, navigate, userInfo, pageNumber]);

  const createGenreHandler = () => {
    navigate('/admin/genres/new');
  };

  const deleteHandler = (id) => {
    if (window.confirm('Seguro?')) {
      //dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Géneros</h1>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Button className='my-3' onClick={createGenreHandler}>
            <i className='fas fa-plus' />
            &nbsp;Crear género
          </Button>
        </Col>
      </Row>
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
                <th>Destacado?</th>
                <th>Color</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {genres.map((genre) => (
                <tr key={genre._id}>
                  <td>{genre._id}</td>
                  <td>{genre.name}</td>
                  <td>
                    {genre.highlight ? (
                      <i className='fas fa-check' style={{ color: 'green' }} />
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <p style={{ color: genre.color }}>{genre.color}</p>
                  </td>
                  <td>
                    <LinkContainer to={`/admin/genres/${genre._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit' />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(genre._id)}
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

export default GenresListScreen;
