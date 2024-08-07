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

export async function deleteProduct(data) {
  const { productId, userInfo } = data;
  try {
    const response = await axios.delete(`/api/products/delete/${productId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message;
  }
}

export async function createProduct(data) {
  const { productData, userInfo } = data;
  try {
    const response = await axios.post(`/api/products/create/`, productData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message;
  }
}
