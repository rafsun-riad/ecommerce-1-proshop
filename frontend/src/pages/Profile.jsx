import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  fetchUserDetails,
  fetchUserProfileUpdate,
  updateSuccessReset,
} from '../features/users/usersSlice';
import { getAllOrder } from '../features/order/orderAPI';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const { user, userInfo, isLoading, isError, error, success } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userUpdateData = {
    name: name,
    email: email,
    password: password,
    token: userInfo?.token,
  };

  useEffect(() => {
    const userData = { token: userInfo?.token };
    if (!userInfo) {
      navigate('login');
      return () => {};
    } else {
      if (!user || !user.name) {
        dispatch(fetchUserDetails(userData));
      } else {
        setName(userInfo.name);
        setEmail(userInfo.email);
      }
    }
  }, [userInfo, navigate, dispatch, user]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(updateSuccessReset());
      }, 5000);
    }
    return () => {};
  }, [dispatch, success]);

  useEffect(() => {
    dispatch(getAllOrder({ userInfo }));
  }, [dispatch, userInfo]);

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(fetchUserProfileUpdate(userUpdateData));
      setMessage('');
    }
  }
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {success && (
          <Message variant="success">Profile Updated Successfully</Message>
        )}
        {message && <Message variant="danger">{message}</Message>}
        {isError && <Message variant="danger">{error}</Message>}
        {isLoading && <Loader />}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="Name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
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

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button style={{ marginTop: '10px' }} type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
}

export default Profile;
