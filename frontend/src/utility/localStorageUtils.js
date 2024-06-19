export function loadCartState() {
  const serializedData = localStorage.getItem('cartItems');
  if (serializedData === null) {
    return null;
  }
  return JSON.parse(serializedData);
}

export function saveCartState(state) {
  const serializedData = JSON.stringify(state);
  localStorage.setItem('cartItems', serializedData);
}

export function loadUserState() {
  const serializedData = localStorage.getItem('userInfo');
  if (serializedData === null) {
    return null;
  }
  return JSON.parse(serializedData);
}

export function saveUserState(state) {
  const serializedData = JSON.stringify(state);
  if (serializedData === undefined) {
    localStorage.setItem('userInfo', null);
  }
  localStorage.setItem('userInfo', serializedData);
}
