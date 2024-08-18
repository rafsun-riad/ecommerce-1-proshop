import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

function SearchBox() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return <Form onSubmit={handleSubmit}></Form>;
}

export default SearchBox;
