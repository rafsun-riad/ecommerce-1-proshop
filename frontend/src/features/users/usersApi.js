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

export async function getAllUser(data) {
  const { userInfo } = data;

  try {
    const response = await axios.get('/api/users/', {
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

export async function deleteUser(data) {
  const { userInfo, id } = data;
  try {
    const response = await axios.delete(`/api/users/delete/${id}`, {
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

export async function getUserById(data) {
  const { userInfo, id } = data;

  try {
    const response = await axios.delete(`/api/users/${id}/`, {
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

export async function updateUser(data) {
  const { userInfo, userUpdateData } = data;

  try {
    const response = await axios.put(
      `/api/users/update/${userUpdateData.userEditingId}/`,
      userUpdateData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
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
