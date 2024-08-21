import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SearchBox() {
  const [keyword, setKeyword] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (keyword) {
      navigate(`/?keyword=${keyword}&page=1`);
    } else {
      return;
    }
  }

  return (
    <Form onSubmit={handleSubmit} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-succes" className="p-2">
        Submit
      </Button>
    </Form>
  );
}

export default SearchBox;
