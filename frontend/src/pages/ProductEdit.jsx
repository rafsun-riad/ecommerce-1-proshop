import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import {
  fetchProductDetails,
  resetCreatedProduct,
  resetSuccess,
  updateProductById,
} from '../features/products/productSlice';

function ProductEdit() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStcok, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const { userInfo } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { productDetails, isLoading, isError, error } = useSelector(
    (state) => state.products
  );

  const productUpdateData = {
    name,
    price,
    image,
    brand,
    category,
    countInStcok,
    description,
  };

  useEffect(() => {
    dispatch(resetSuccess());
    if (productDetails?._id !== Number(id)) {
      dispatch(fetchProductDetails(id));
    } else {
      setName(productDetails.name);
      setPrice(productDetails.price);
      setImage(productDetails.image);
      setBrand(productDetails.brand);
      setCategory(productDetails.category);
      setCountInStock(productDetails.countInStcok);
      setDescription(productDetails.description);
    }

    if (productDetails?._id) {
      dispatch(resetCreatedProduct());
    }
  }, [
    dispatch,
    productDetails?._id,
    id,
    productDetails.name,
    productDetails.price,
    productDetails.image,
    productDetails.brand,
    productDetails.category,
    productDetails.countInStcok,
    productDetails.description,
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateProductById({ userInfo, productUpdateData, id }));
    navigate('/admin/productlist');
  }

  async function handleUploadFile(e) {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('image', file);
    formData.append('product_id', id);

    setUploading(true);

    try {
      const { data } = await axios.post('/api/products/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  }
  return (
    <div>
      <Link to="/admin/productlist">Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={handleUploadFile}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count In Stock"
                value={countInStcok}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
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

export default ProductEdit;
