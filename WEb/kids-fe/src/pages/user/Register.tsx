import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    console.log("Register info:", form);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-indigo-500 to-blue-400 px-6">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Tạo tài khoản mới
        </h1>

        {error && (
          <p className="text-center text-sm text-red-500 mb-4 bg-red-50 p-2 rounded-lg">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Địa chỉ email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full text-sm shadow-md hover:opacity-90 transition-all"
          >
            Đăng ký
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Đăng nhập
          </Link>
        </p>

        {/* 🔹 Liên kết quay về trang chủ */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 text-sm hover:text-blue-600 transition"
          >
            <FaArrowLeft className="text-gray-500" />
            Quay về trang chủ
          </Link>
        </div>
      </div>

      <footer className="mt-6 text-xs text-gray-200 text-center">
        © 2025 YourShop. Tất cả các quyền được bảo lưu.
      </footer>
    </div>
  );
}

export default Register;
