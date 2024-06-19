import axios from 'axios';

export async function userLogin(email, password) {
  try {
    const response = await axios.post(
      '/api/users/login/',
      {
        username: email,
        password: password,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    throw error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message;
  }
}
