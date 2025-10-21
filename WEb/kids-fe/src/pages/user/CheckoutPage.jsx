import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, clearCart } from "../../utils/cartUtils";
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaMobileAlt,
  FaUniversity,
  FaMapMarkerAlt,
  FaEdit,
} from "react-icons/fa";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
    paymentMethod: "cod",
  });

  // Voucher state
  const [voucherApplied, setVoucherApplied] = useState(false);
  const voucherDiscount = 50000; // 50.000₫
  const voucherThreshold = 500000; // 500.000₫

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const formatPrice = (price) =>
    price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const totalBefore = cart.reduce(
    (sum, item) => sum + item.price * item.quantity * (1 - (item.sale || 0)),
    0
  );

  const shippingFee = 30000;
  // Tính voucher nếu được áp dụng và đủ điều kiện
  const discount = voucherApplied && totalBefore >= voucherThreshold ? voucherDiscount : 0;

  const finalTotal = totalBefore + shippingFee - discount;

  const handleCheckout = () => {
    if (!form.fullName || !form.phone || !form.address) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin giao hàng!");
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
      total: finalTotal,
      voucherApplied: discount > 0,
      discount,
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
    <div className="bg-gray-100 py-6 px-2 sm:px-4 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-6 text-center">
          🛍️ Thanh Toán Đơn Hàng
        </h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            Giỏ hàng trống.
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
            >
              Quay lại trang chủ
            </button>
          </div>
        ) : (
          <>
            {/* Địa chỉ giao hàng */}
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-700">
                  <FaMapMarkerAlt className="text-orange-600 text-lg" />
                  <div>
                    <p className="font-semibold">
                      {form.fullName || "Chưa nhập tên"} - {form.phone || "Chưa nhập SĐT"}
                    </p>
                    <p>{form.address || "Chưa nhập địa chỉ"}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    document.getElementById("info-form").scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="text-sm text-orange-600 hover:underline flex items-center gap-1"
                >
                  <FaEdit /> Thay đổi
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Thông tin người nhận */}
              <div id="info-form">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                  Thông tin người nhận
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Họ và tên"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Số điện thoại"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Địa chỉ giao hàng"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    rows="3"
                  />
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    placeholder="Ghi chú (tuỳ chọn)"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    rows="2"
                  />
                </div>

                {/* Phương thức thanh toán */}
                <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-3 border-b pb-2">
                  Phương thức thanh toán
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      id: "cod",
                      label: "Thanh toán khi nhận hàng (COD)",
                      icon: <FaMoneyBillWave className="text-green-600" />,
                    },
                    {
                      id: "momo",
                      label: "Ví Momo",
                      icon: <FaMobileAlt className="text-pink-500" />,
                    },
                    {
                      id: "zalopay",
                      label: "Ví ZaloPay",
                      icon: <FaMobileAlt className="text-blue-500" />,
                    },
                    {
                      id: "visa",
                      label: "Thẻ Visa / MasterCard",
                      icon: <FaCreditCard className="text-yellow-600" />,
                    },
                    {
                      id: "bank",
                      label: "Chuyển khoản ngân hàng",
                      icon: <FaUniversity className="text-gray-700" />,
                    },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 border rounded-lg px-4 py-2 cursor-pointer transition ${
                        form.paymentMethod === method.id
                          ? "border-orange-500 bg-orange-50"
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

                {/* Hiển thị mã QR nếu chọn chuyển khoản ngân hàng */}
                {form.paymentMethod === "bank" && (
                  <div className="mt-4 border p-4 rounded-lg bg-blue-50 text-center">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Quét mã QR để chuyển khoản
                    </h3>
                    <img
                      src="https://i.imgur.com/DY7iBJu.jpeg" // Thay bằng đường dẫn ảnh QR thật của bạn
                      alt="QR chuyển khoản"
                      className="w-48 h-48 mx-auto object-cover rounded border"
                    />
                    <p className="text-xs text-gray-600 mt-2">
                      Vui lòng nhập nội dung chuyển khoản theo hướng dẫn <br />
                      <br />
                      <h1>MuahangMBS</h1>
                    </p>
                  </div>
                )}

                {/* Voucher */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-2">
                    Ưu đãi / Mã giảm giá
                  </h2>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={voucherApplied}
                      onChange={() => setVoucherApplied(!voucherApplied)}
                      className="w-5 h-5 accent-orange-500"
                    />
                    <span className="text-gray-700">
                      Áp dụng giảm {formatPrice(voucherDiscount)} cho đơn hàng từ{" "}
                      {formatPrice(voucherThreshold)}
                    </span>
                  </div>
                  {voucherApplied && totalBefore < voucherThreshold && (
                    <p className="text-sm text-red-500 mt-1">
                      Đơn hàng phải đạt {formatPrice(voucherThreshold)} để áp dụng voucher.
                    </p>
                  )}
                </div>
              </div>

              {/* Đơn hàng */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
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
                          className="w-14 h-14 rounded object-cover border"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-500">SL: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-orange-600 font-semibold text-sm">
                        {formatPrice(item.price * item.quantity * (1 - (item.sale || 0)))}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 border-t pt-3 space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Tạm tính</span>
                    <span>{formatPrice(totalBefore)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển</span>
                    <span>{formatPrice(shippingFee)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm voucher</span>
                      <span>‑{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold border-t pt-3">
                    <span>Tổng cộng</span>
                    <span className="text-orange-600">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition"
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
          </>
        )}
      </div>
    </div>
  );
}
