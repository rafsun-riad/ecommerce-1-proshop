import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

function PlaceOrder() {
  const { cartItems, shippingAddress, paymenthMethod } = useSelector(
    (state) => state.cart
  );
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
    </div>
  );
}

export default PlaceOrder;
