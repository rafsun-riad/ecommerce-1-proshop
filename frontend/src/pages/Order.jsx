import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchOrderDetails } from '../features/order/orderSlice';

import Message from '../components/Message';
import Loader from '../components/Loader';

function Order() {
  const { orderDetails, error, isLoading, isError } = useSelector(
    (state) => state.order
  );

  const { orderId } = useParams();

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.users);
  let itemsPrice = 0;
  if (!isLoading && !isError) {
    itemsPrice = orderDetails?.orderItems
      ?.reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }
  useEffect(() => {
    const data = { userInfo, id: orderId };
    if (!orderDetails || orderDetails._id !== Number(orderId)) {
      dispatch(fetchOrderDetails(data));
    }
  }, [dispatch, orderId, userInfo, orderDetails]);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <Row>
        <h2>Order: {orderId}</h2>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {orderDetails.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${orderDetails.user.email}`}>
                  {orderDetails.user.email}
                </a>
              </p>
              <p>
                <strong>Shipping: </strong>
                {orderDetails.shippingAddress?.address},{' '}
                {orderDetails.shippingAddress?.city}{' '}
                {orderDetails.shippingAddress?.postalCode},{' '}
                {orderDetails.shippingAddress?.country}
              </p>
              {orderDetails.isDelivered ? (
                <Message variant="success">
                  Delivered on {orderDetails.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {orderDetails?.paymentMethod}
              </p>
              {orderDetails.isPaid ? (
                <Message variant="success">
                  Paid on {orderDetails.paidAt}
                </Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Item</h2>
              {orderDetails.orderItems?.length === 0 ? (
                <Message variant="info">No order to show</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderDetails?.orderItems?.map((item, index) => (
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
                <Col>${itemsPrice}</Col>
              </ListGroup.Item>

              <ListGroup.Item>
                <Col>Shipping: </Col>
                <Col>${orderDetails?.shippingPrice}</Col>
              </ListGroup.Item>

              <ListGroup.Item>
                <Col>Tax: </Col>
                <Col>${orderDetails?.taxPrice}</Col>
              </ListGroup.Item>

              <ListGroup.Item>
                <Col>Total: </Col>
                <Col>${orderDetails?.totalPrice}</Col>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Order;
