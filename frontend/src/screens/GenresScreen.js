import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
  createGenre,
  listGenreDetails,
  updateGenre,
} from '../actions/genreActions';
import {
  GENRE_CREATE_RESET,
  GENRE_DETAILS_RESET,
  GENRE_UPDATE_RESET,
} from '../constants/genreConstants';

const GenresScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const genreId = params.id;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [highlight, setHighlight] = useState(false);
  const [color, setColor] = useState('');
  const [uploading, setUploading] = useState(false);

  const genreDetails = useSelector((state) => state.genreDetails);
  const { loading, error, genre } = genreDetails;

  const genreCreate = useSelector((state) => state.genreCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = genreCreate;

  const genreUpdate = useSelector((state) => state.genreUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = genreUpdate;

  const submitHandler = (e) => {
    e.preventDefault();
    if (genreId) {
      dispatch(
        updateGenre({
          _id: genreId,
          name,
          image,
          highlight,
          color,
        })
      );
    } else {
      dispatch(
        createGenre({
          name,
          image,
          highlight,
          color,
        })
      );
    }
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
    if (successUpdate) {
      dispatch({ type: GENRE_DETAILS_RESET });
      dispatch({ type: GENRE_UPDATE_RESET });
      navigate('/admin/genresList');
    } else if (successCreate) {
      dispatch({ type: GENRE_CREATE_RESET });
      navigate('/admin/genresList');
    } else {
      if (!genre.name || genre._id !== genreId) {
        dispatch(listGenreDetails(genreId));
      } else {
        setName(genre.name);
        setHighlight(genre.highlight === true ? true : false);
        setImage(genre.image);
        setColor(genre.color);
      }
    }
  }, [dispatch, navigate, genre, genreId, successCreate, successUpdate]);

  return (
    <>
      <Link to='/admin/genresList' className='btn btn-liht my-3'>
        Atràs
      </Link>
      <FormContainer>
        <h1>Crear Género</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
                checked={highlight}
                label='Destacado?'
                onChange={(e) => {
                  setHighlight(e.target.value === 'on' ? true : false);
                }}
              />
            </Form.Group>
            <Form.Group controlId='color'>
              <Form.Label>Color</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingrese color'
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Form.Group>
            <Button className='my-3' type='submit' variant='primary'>
              Actualizar
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default GenresScreen;
