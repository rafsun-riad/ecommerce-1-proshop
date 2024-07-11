import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchOrderDetails } from '../features/order/orderSlice';

import Message from '../components/Message';
import Loader from '../components/Loader';

function Order() {
  const { orderDetails, error, isLoading, isError } = useSelector(
    (state) => state.order
  );
  console.log(orderDetails);
  const { order } = orderDetails;

  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.users);
  //   let itemsPrice = 0;
  //   if (!isLoading && !isError) {
  //     itemsPrice = order.orderItems
  //       .reduce((acc, item) => acc + item.price * item.qty, 0)
  //       .toFixed(2);
  //   }

  useEffect(() => {
    if (!order || order._id !== Number(orderId)) {
      dispatch(fetchOrderDetails({ userInfo, id: orderId }));
    }
  }, [dispatch, orderId, userInfo, order]);

  return (
    <div>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Item</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">No order to show</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price}= $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Col>Item: </Col>
                <Col>${order.itemsPrice}</Col>
              </ListGroup.Item>

              <ListGroup.Item>
                <Col>Shipping: </Col>
                <Col>${order.shippingPrice}</Col>
              </ListGroup.Item>

              <ListGroup.Item>
                <Col>Tax: </Col>
                <Col>${order.taxPrice}</Col>
              </ListGroup.Item>

              <ListGroup.Item>
                <Col>Total: </Col>
                <Col>${order.totalPrice}</Col>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Order;
