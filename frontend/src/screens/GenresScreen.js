import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createGenre } from '../actions/genreActions';
import { GENRE_CREATE_RESET } from '../constants/genreConstants';

const GenresScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [highlight, setHighlight] = useState(false);
  const [uploading, setUploading] = useState(false);

  const genreCreated = useSelector((state) => state.genreCreated);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = genreCreated;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createGenre({
        name,
        image,
        highlight,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: GENRE_CREATE_RESET });
      navigate('/admin/genressList');
    } else {
      /*if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }*/
    }
  }, [dispatch, navigate, successCreate]);

  return (
    <>
      <Link to='/admin/genresList' className='btn btn-liht my-3'>
        Atràs
      </Link>
      <FormContainer>
        <h1>Crear Género</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='name'
              placeholder='Ingrese nombre'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='image'>
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type='text'
              placeholder='Ingrese imagen'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='imagefile' className='mb-3'>
            <Form.Label>Elegir imagen</Form.Label>
            <Form.Control type='file' onChange={uploadFileHandler} />
          </Form.Group>
          {uploading && <Loader />}
          <Form.Group controlId='highlight'>
            <Form.Check
              type='checkbox'
              value={true}
              label='Destacado?'
              onChange={(e) => setHighlight(e.target.value)}
              checked={highlight === 'true'}
            />
          </Form.Group>
          <Button className='my-3' type='submit' variant='primary'>
            Actualizar
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default GenresScreen;
