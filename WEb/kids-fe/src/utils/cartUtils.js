// Lưu 1 sản phẩm vào giỏ hàng trong localStorage
export const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const exist = cart.find((item) => item.id === product.id);
  if (exist) {
    exist.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Lấy giỏ hàng
export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

// Xóa giỏ hàng
export const clearCart = () => {
  localStorage.removeItem("cart");
};
