import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const clearHandler = () => {
    setKeyword('');
    navigate(`/`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Button type='submit' variant='dark' className='p-2 btn-search-icon'>
        <i className='fa-solid fa-magnifying-glass' />
      </Button>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Buscar...'
        className='mr-sm-2 ml-sm-5 btn-search'
      ></Form.Control>
      <Button
        type='button'
        variant='dark'
        className='p-2 btn-search-icon'
        onClick={clearHandler}
      >
        <i className='fa-solid fa-xmark' />
      </Button>
    </Form>
  );
};

export default SearchBox;
