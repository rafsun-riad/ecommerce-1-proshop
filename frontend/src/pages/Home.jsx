import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsList } from '../features/products/productSlice';

import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

function Home() {
  const dispatch = useDispatch();
  const { products, error, isLoading, isError } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductsList());
  }, [dispatch]);

  return (
    <div>
      <h1>Latest Product</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Home;
