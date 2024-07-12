import axios from 'axios';

export async function createOrder(orderDetails) {
  const { userInfo } = orderDetails;
  try {
    const response = await axios.post('/api/orders/add/', orderDetails, {
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

export async function getOrderDetails(data) {
  const { userInfo, id } = data;
  console.log(userInfo, id);

  try {
    const response = await axios.get(`/api/orders/${id}/`, {
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
