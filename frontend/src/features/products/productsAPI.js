import axios from 'axios';

export async function getProducts() {
  try {
    const response = await axios.get('/api/products/');
    return response.data;
  } catch (error) {
    throw error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message;
  }
}

export async function getProductDetails(id) {
  try {
    const response = await axios.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message;
  }
}
