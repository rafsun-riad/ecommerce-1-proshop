export function loadCartState() {
  const serializedData = localStorage.getItem('cartItems');
  if (serializedData === null) {
    return undefined;
  }
  return JSON.parse(serializedData);
}

export function saveCartState(state) {
  const serializedData = JSON.stringify(state);
  localStorage.setItem('cartItems', serializedData);
}
