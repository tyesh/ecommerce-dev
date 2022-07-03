import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import Multiselect from 'multiselect-react-dropdown';
import { listAllGenres } from '../actions/genreActions';
import { listaLLAuthors } from '../actions/authorActions';

const ProductEditScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [uploading, setUploading] = useState(false);

  const productId = params.id;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  console.log(product);

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const genreListAll = useSelector((state) => state.genreListAll);
  const { loadingGenres, errorGenres, genres: genresList } = genreListAll;

  const authorListAll = useSelector((state) => state.authorListAll);
  const { loadingAuthors, errorAuthors, authors: authorsList } = authorListAll;

  const optionsGenres = Array.from(genresList, (x) => ({
    _id: x._id,
    name: x.name,
  }));

  const optionsAuthors = Array.from(authorsList, (x) => ({
    _id: x._id,
    name: x.name,
  }));

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        brand,
        category,
        description,
        countInStock,
        image,
        genres,
        authors,
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

  const selGenreHandler = (selectedList) => {
    setGenres(Array.from(selectedList, (x) => ({ _id: x._id, name: x.name })));
  };

  const selAuthorHandler = (selectedList) => {
    setAuthors(Array.from(selectedList, (x) => ({ _id: x._id, name: x.name })));
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate('/admin/productsList');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setGenres(product.genres);
        setAuthors(product.authors);
      }
    }
    dispatch(listAllGenres());
    dispatch(listaLLAuthors());
  }, [dispatch, navigate, product, productId, successUpdate]);

  return (
    <>
      <Link to='/admin/productsList' className='btn btn-liht my-3'>
        Atràs
      </Link>
      <FormContainer>
        <h1>Editar Producto</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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
            <Form.Group controlId='price'>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type='number'
                placeholder='Ingrese precio'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
            <Form.Group controlId='brand'>
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingrese marca'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingrese categoría'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='countInStock'>
              <Form.Label>Cantidad en stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Ingrese cantidad stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Generos</Form.Label>
              {loadingGenres ? (
                <Loader />
              ) : errorGenres ? (
                <Message variant='danger'>{errorGenres}</Message>
              ) : (
                <Multiselect
                  options={optionsGenres}
                  selectedValues={genres}
                  onSelect={selGenreHandler}
                  onRemove={selGenreHandler}
                  displayValue='name'
                  placeholder='Seleccione genero...'
                  onKeyPressFn={(e) => {
                    if (e.key === 'Enter') e.preventDefault();
                  }}
                />
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Autores</Form.Label>
              {loadingAuthors ? (
                <Loader />
              ) : errorAuthors ? (
                <Message variant='danger'>{errorAuthors}</Message>
              ) : (
                <Multiselect
                  options={optionsAuthors}
                  selectedValues={authors}
                  onSelect={selAuthorHandler}
                  onRemove={selAuthorHandler}
                  displayValue='name'
                  placeholder='Seleccione autor...'
                  onKeyPressFn={(e) => {
                    if (e.key === 'Enter') e.preventDefault();
                  }}
                />
              )}
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ingrese descripción'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

export default ProductEditScreen;
