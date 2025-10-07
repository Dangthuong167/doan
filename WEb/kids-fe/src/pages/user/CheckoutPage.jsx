import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, clearCart } from "../../utils/cartUtils";
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaMobileAlt,
  FaUniversity,
} from "react-icons/fa";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // Form thanh toán
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
    paymentMethod: "cod",
  });

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity * (1 - (item.sale || 0)),
    0
  );

  const formatPrice = (price) =>
    price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const handleCheckout = () => {
    if (!form.fullName || !form.phone || !form.address) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin giao hàng!");
      return;
    }

    if (!form.paymentMethod) {
      alert("⚠️ Vui lòng chọn phương thức thanh toán!");
      return;
    }

    if (cart.length === 0) {
      alert("🛒 Giỏ hàng của bạn đang trống!");
      return;
    }

    const order = {
      id: Date.now(),
      customer: form,
      items: cart,
      total,
      createdAt: new Date().toLocaleString(),
    };

    console.log("Đơn hàng mới:", order);

    alert(
      `✅ Thanh toán thành công bằng ${
        {
          cod: "COD (khi nhận hàng)",
          momo: "Momo",
          zalopay: "ZaloPay",
          visa: "Visa/MasterCard",
          bank: "Chuyển khoản ngân hàng",
        }[form.paymentMethod]
      }!\nĐơn hàng của bạn đang được xử lý.`
    );

    clearCart();
    navigate("/");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          🧾 Thanh toán đơn hàng
        </h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            Giỏ hàng trống. <br />
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Quay lại trang chủ
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* 🧍‍♂️ THÔNG TIN NGƯỜI NHẬN */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Thông tin người nhận
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Họ và tên"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Số điện thoại"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Địa chỉ giao hàng"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  rows="3"
                ></textarea>
                <textarea
                  name="note"
                  value={form.note}
                  onChange={handleChange}
                  placeholder="Ghi chú (tuỳ chọn)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  rows="2"
                ></textarea>
              </div>

              {/* 💳 PHƯƠNG THỨC THANH TOÁN */}
              <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3 border-b pb-2">
                Phương thức thanh toán
              </h2>
              <div className="space-y-3">
                {[
                  { id: "cod", label: "Thanh toán khi nhận hàng (COD)", icon: <FaMoneyBillWave className="text-green-600" /> },
                  { id: "momo", label: "Ví điện tử Momo", icon: <FaMobileAlt className="text-pink-500" /> },
                  { id: "zalopay", label: "Ví ZaloPay", icon: <FaMobileAlt className="text-blue-500" /> },
                  { id: "visa", label: "Thẻ Visa / MasterCard", icon: <FaCreditCard className="text-yellow-600" /> },
                  { id: "bank", label: "Chuyển khoản ngân hàng", icon: <FaUniversity className="text-gray-700" /> },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-3 border rounded-lg px-4 py-2 cursor-pointer transition ${
                      form.paymentMethod === method.id
                        ? "border-blue-500 bg-blue-50"
                        : "hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={form.paymentMethod === method.id}
                      onChange={handleChange}
                    />
                    {method.icon}
                    <span>{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 🛒 ĐƠN HÀNG */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Đơn hàng của bạn
              </h2>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover border"
                      />
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          SL: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-blue-600 font-semibold text-sm">
                      {formatPrice(
                        item.price * item.quantity * (1 - (item.sale || 0))
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t pt-3 space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>{formatPrice(30000)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-3">
                  <span>Tổng cộng</span>
                  <span className="text-blue-600">
                    {formatPrice(total + 30000)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition"
              >
                Xác nhận thanh toán
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="w-full mt-3 border border-gray-400 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
              >
                Quay lại giỏ hàng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
