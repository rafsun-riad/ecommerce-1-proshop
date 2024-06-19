import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { fetchUserInfo } from '../features/users/usersSlice';

function Login({ location }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userInfo, isLoading, isError, error } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirectLocation = useLocation();
  const redirectLink = redirectLocation.search
    ? redirectLocation.search.split('=')[1]
    : '/';

  const userCredential = { email: email, password: password };

  useEffect(() => {
    if (userInfo) {
      navigate(`${redirectLink}`);
      return () => {};
    }
  }, [userInfo, redirectLink, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(fetchUserInfo(userCredential));
    setEmail('');
    setPassword('');
  }
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {isError && <Message variant="danger">{error}</Message>}
      {isLoading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button style={{ marginTop: '10px' }} type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{' '}
          <Link
            to={
              redirectLink ? `/register?redirect=${redirectLink}` : '/register'
            }
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default Login;
