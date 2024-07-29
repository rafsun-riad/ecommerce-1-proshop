import { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchAllUsers } from '../features/users/usersSlice';

function UserList() {
  const { userInfo, usersList, isLoading, isError, error } = useSelector(
    (state) => state.users
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers({ userInfo }));
  }, [dispatch, userInfo]);
  return <div></div>;
}

export default UserList;
