import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  Form,
  Button,
  Card,
  ListGroup,
} from 'react-bootstrap';
import Message from '../components/Message';
import { removeFromCart, updateQuantiy } from '../features/cart/cartSlice';

function Cart() {
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  function handleQuantityUpdate(e, product) {
    dispatch(updateQuantiy({ ...product, qty: Number(e.target.value) }));
  }

  function handleCheckout() {}

  return (
    <>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>

                    <Col md={3}>
                      <Link to={`/products/${item._id}`}>{item.name}</Link>
                    </Col>

                    <Col md={2}>${item.price}</Col>

                    <Col md={3}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => handleQuantityUpdate(e, item)}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => dispatch(removeFromCart(item))}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                $
                {cartItems.reduce(
                  (acc, item) => acc + item.qty * Number(item.price),
                  0
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  style={{ width: '100%' }}
                  disabled={cartItems.length === 0}
                  onClick={handleCheckout}
                >
                  Proceed to checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Cart;
