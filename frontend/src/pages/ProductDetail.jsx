import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../features/products/productSlice';

import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../features/cart/cartSlice';

function ProductDetail({ history }) {
  const [qty, setQty] = useState(1);

  const {
    productDetails: product,
    isLoading,
    isError,
    error,
  } = useSelector((store) => store.products);
  const dispatch = useDispatch();

  const { id } = useParams();
  const { cartItems } = useSelector((store) => store.cart);
  const item = cartItems.find((item) => item._id === product._id);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [id, dispatch]);

  function handleAddToCart() {
    dispatch(addToCart({ ...product, qty: qty }));
  }
  function handleRemoveFromCart() {
    dispatch(removeFromCart(product));
  }

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={'#f8e825'}
                />
              </ListGroup.Item>

              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                {item ? (
                  <ListGroup.Item>
                    <Button
                      style={{ width: '100%' }}
                      onClick={handleRemoveFromCart}
                      className="btn-block"
                      type="button"
                    >
                      Remove from Cart
                    </Button>
                    <Link to="/cart">
                      <Button
                        style={{ width: '100%' }}
                        type="button"
                        variant="outline-dark"
                        className="mt-1"
                      >
                        Show Cart
                      </Button>
                    </Link>
                  </ListGroup.Item>
                ) : (
                  <ListGroup.Item>
                    <Button
                      style={{ width: '100%' }}
                      onClick={handleAddToCart}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductDetail;
