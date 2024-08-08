import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { fetchUserById, updateUserById } from '../features/users/usersSlice';

function UserEdit() {
  const [name, setName] = useState();
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { userId } = useParams();
  const navigate = useNavigate();

  const { userInfo, userDetailsById, isLoading, isError, error, success } =
    useSelector((state) => state.users);
  const dispatch = useDispatch();

  const userUpdateData = {
    name,
    email,
    isAdmin,
    userEditingId: userDetailsById._id,
  };

  useEffect(() => {
    if (success) {
      navigate('/admin/userlist');
    }
  }, [success, navigate]);

  useEffect(() => {
    if (!userDetailsById.name && userDetailsById._id !== Number(userId)) {
      dispatch(fetchUserById({ userInfo, userId }));
    } else {
      setName(userDetailsById.name);
      setEmail(userDetailsById.email);
      setIsAdmin(userDetailsById.isAdmin);
    }
    return () => {};
  }, [
    dispatch,
    userDetailsById._id,
    userDetailsById.email,
    userDetailsById.name,
    userId,
    userInfo,
    userDetailsById.isAdmin,
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUserById({ userInfo, userUpdateData }));
  }
  return (
    <div>
      <Link to="/admin/userlist">Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="Name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button
              style={{ marginTop: '10px' }}
              type="submit"
              variant="primary"
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default UserEdit;
