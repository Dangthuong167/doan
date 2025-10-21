import { useEffect, useState } from "react";
import { getCart, clearCart } from "../../utils/cartUtils";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const formatVND = (value) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const updateQuantity = (id, delta) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return {
          ...item,
          quantity: newQuantity < 1 ? 1 : newQuantity,
        };
      }
      return item;
    });
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity * (1 - (item.sale || 0)),
    0
  );

  const discount = voucherApplied && total >= 500000 ? 50000 : 0;

  return (
    <div className="max-w-6xl mx-auto mt-10 mb-20 bg-white shadow rounded-lg border border-gray-200">
      <div className="p-4 border-b flex items-center justify-between bg-orange-50 rounded-t-lg">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          🏬 Cửa hàng chính hãng
        </h2>
        <p className="text-sm text-orange-600 font-medium">Mall</p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          Giỏ hàng trống.{" "}
          <button
            onClick={() => navigate("/")}
            className="text-orange-600 font-semibold hover:underline"
          >
            Mua ngay
          </button>
        </div>
      ) : (
        <>
          {/* Danh sách sản phẩm */}
          <div className="divide-y">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 hover:bg-orange-50 transition"
              >
                <input
                  type="checkbox"
                  className="mt-5 w-4 h-4 accent-orange-500"
                />

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Giá:{" "}
                    <span className="text-orange-600 font-semibold">
                      {formatVND(item.price * (1 - (item.sale || 0)))}
                    </span>
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 text-gray-600"
                    >
                      -
                    </button>
                    <span className="font-medium text-gray-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 text-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between h-full">
                  <p className="text-lg font-semibold text-gray-800">
                    {formatVND(
                      item.price * item.quantity * (1 - (item.sale || 0))
                    )}
                  </p>
                  <button
                    onClick={() => {
                      const newCart = cart.filter((p) => p.id !== item.id);
                      setCart(newCart);
                      localStorage.setItem("cart", JSON.stringify(newCart));
                    }}
                    className="text-sm text-orange-600 hover:underline mt-2 flex items-center gap-1"
                  >
                    <FaTrashAlt /> Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Vùng voucher + tổng tiền */}
          <div className="border-t mt-4">
            <div className="flex flex-col sm:flex-row justify-between items-center p-4">
              <div className="text-gray-600 text-sm flex items-center gap-3">
                <p>🎟️ Giảm 50.000₫ phí vận chuyển đơn trên 500.000₫</p>
                <button
                  className="text-orange-600 font-medium hover:underline"
                  onClick={() => setVoucherApplied(!voucherApplied)}
                >
                  {voucherApplied ? "Bỏ chọn voucher" : "Chọn voucher"}
                </button>
              </div>
            </div>

            <div className="bg-gray-50 border-t p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-orange-500"
                />
                <p className="font-medium text-gray-700">
                  Chọn tất cả ({cart.length})
                </p>
                <button
                  onClick={() => {
                    clearCart();
                    setCart([]);
                  }}
                  className="text-orange-600 text-sm hover:underline"
                >
                  Xóa tất cả
                </button>
              </div>

              <div className="text-right">
                <p className="text-gray-700">
                  Tổng cộng ({cart.length} sản phẩm):{" "}
                  <span className="text-2xl font-bold text-orange-600">
                    {formatVND(total - discount)}
                  </span>
                </p>
                {voucherApplied && total >= 500000 ? (
                  <p className="text-sm text-green-600">
                    ✅ Đã áp dụng mã giảm 50.000₫
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    {voucherApplied
                      ? "❌ Đơn hàng cần trên 500.000₫ để áp dụng mã giảm"
                      : "Bạn chưa áp dụng voucher"}
                  </p>
                )}
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="bg-orange-600 text-white px-10 py-3 rounded-lg font-semibold hover:bg-orange-700 transition mt-2 sm:mt-0"
              >
                Mua Hàng
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
