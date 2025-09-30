import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { LoginForm } from "../types/auth";
import { useAppDispatch } from "../hooks";
import { signin } from "../redux/authSlice";

const schema = yup
  .object({
    email: yup.string().required().email("Email không hợp lệ!"),
    password: yup.string().required().min(6, "Mật khẩu tối thiểu 6 ký tự"),
    isRemember: yup.boolean().required(),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { isRemember: false },
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: LoginForm) => {
    dispatch(signin(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl shadow-md flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Bên trái: hình sản phẩm nổi bật */}
        <div className="md:w-1/2 flex flex-col items-center justify-center bg-gray-50 p-6">
          <img
            src="https://cdn.mos.cms.futurecdn.net/h4utvXjD2QUoB4jQKoRQ6Y.jpg"
            alt="Điện thoại nổi bật"
            className="w-80 max-w-full"
          />
          <h1 className="text-xl font-bold mt-4">Mobile Shop</h1>
          <p className="text-gray-500 text-sm">
            Đăng nhập để mua sắm nhanh hơn
          </p>
        </div>

        {/* Bên phải: form đăng nhập */}
        <div className="md:w-1/2 flex flex-col justify-center p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Đăng nhập tài khoản
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                {...register("email")}
                type="text"
                placeholder="Nhập email"
                className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-gray-700">Mật khẩu</label>
                <a href="#" className="text-blue-600 text-sm hover:underline">
                  Quên mật khẩu?
                </a>
              </div>
              <input
                {...register("password")}
                type="password"
                placeholder="Nhập mật khẩu"
                className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>
            <div className="flex items-center">
              <input
                {...register("isRemember")}
                type="checkbox"
                id="remember"
                className="mr-2 accent-blue-500"
              />
              <label htmlFor="remember" className="text-gray-600 text-sm">
                Ghi nhớ đăng nhập
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition"
            >
              Đăng nhập
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <a href="/register" className="text-blue-600 font-semibold hover:underline">
              Đăng ký ngay
            </a>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-3 text-gray-400 text-sm">Hoặc đăng nhập với</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="flex justify-center gap-4">
            <button className="w-10 h-10 rounded-full bg-[#f0f0f0] flex items-center justify-center hover:bg-[#3b5998] hover:text-white transition">
              <FaFacebookF />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#f0f0f0] flex items-center justify-center hover:bg-[#ea4335] hover:text-white transition">
              <FaGoogle />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#f0f0f0] flex items-center justify-center hover:bg-[#333] hover:text-white transition">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
