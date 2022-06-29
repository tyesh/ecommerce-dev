import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
  createAuthor,
  listAuthorDetails,
  updateAuthor,
} from '../actions/authorActions';
import {
  AUTHOR_CREATE_RESET,
  AUTHOR_DETAILS_RESET,
  AUTHOR_UPDATE_RESET,
} from '../constants/authorConstants';

const AuthorScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authorId = params.id;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [highlight, setHighlight] = useState(false);
  const [uploading, setUploading] = useState(false);

  const authorDetails = useSelector((state) => state.authorDetails);
  const { loading, error, author } = authorDetails;

  const authorCreate = useSelector((state) => state.authorCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = authorCreate;

  const authorUpdate = useSelector((state) => state.authorUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = authorUpdate;

  const submitHandler = (e) => {
    e.preventDefault();
    if (authorId) {
      dispatch(
        updateAuthor({
          _id: authorId,
          name,
          image,
          highlight,
        })
      );
    } else {
      dispatch(
        createAuthor({
          name,
          image,
          highlight,
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
      dispatch({ type: AUTHOR_DETAILS_RESET });
      dispatch({ type: AUTHOR_UPDATE_RESET });
      navigate('/admin/authorsList');
    } else if (successCreate) {
      dispatch({ type: AUTHOR_CREATE_RESET });
      navigate('/admin/authorsList');
    } else if (authorId) {
      if (!author.name || author._id !== authorId) {
        dispatch(listAuthorDetails(authorId));
      } else {
        setName(author.name);
        setHighlight(author.highlight === true ? true : false);
        setImage(author.image);
      }
    }
  }, [dispatch, navigate, author, authorId, successCreate, successUpdate]);

  return (
    <>
      <Link to='/admin/authorsList' className='btn btn-liht my-3'>
        Atràs
      </Link>
      <FormContainer>
        <h1>Crear Autor</h1>
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
            <Button className='my-3' type='submit' variant='primary'>
              {authorId ? 'Actualizar' : 'Crear'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AuthorScreen;
