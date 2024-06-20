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

export async function userRegister(name, email, password) {
  try {
    const response = await axios.post(
      '/api/users/register/',
      {
        name: name,
        email: email,
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

export async function getUserDetails(token) {
  try {
    const response = await axios.get('/api/users/profile/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message;
  }
}

export async function updateUserProfile(userData) {
  const { name, email, password, token } = userData;
  try {
    const response = await axios.put(
      '/api/users/profile/update/',
      {
        name: name,
        email: email,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response && error.response.data.detail
      ? error.response.data.detail
      : error.message;
  }
}
