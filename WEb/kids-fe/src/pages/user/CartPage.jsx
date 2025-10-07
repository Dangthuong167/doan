import { useEffect, useState } from "react";
import { getCart, clearCart } from "../../utils/cartUtils";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const formatVND = (value) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity * (1 - (item.sale || 0)),
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">
        Giỏ hàng của bạn
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Giỏ hàng trống</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600 text-sm">
                    {formatVND(item.price * (1 - (item.sale || 0)))}
                  </p>
                  <p className="text-xs text-gray-500">
                    Số lượng: {item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 text-right">
            <p className="text-lg font-semibold">
              Tổng tiền: <span className="text-indigo-600">{formatVND(total)}</span>
            </p>
          </div>

          <div className="mt-6 flex gap-4 justify-center">
            <button
              onClick={() => navigate("/checkout")}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Thanh toán
            </button>
            <button
              onClick={() => {
                clearCart();
                setCart([]);
              }}
              className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Xóa giỏ hàng
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
