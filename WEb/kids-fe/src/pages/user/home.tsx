import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch } from "../../hooks";
import { signout } from "../../redux/authSlice";
import { useState } from "react";

const categories = [
  { name: "Smartphone", count: 12, icon: "📱" },
  { name: "Tablet", count: 5, icon: "💻" },
  { name: "Phụ kiện", count: 30, icon: "🎧" },
  { name: "Laptop", count: 4, icon: "🖥️" },
  { name: "Smartwatch", count: 9, icon: "⌚" },
  { name: "Khác", count: 8, icon: "⚙️" },
];

const productsData = [
  {
    id: 1,
    name: "iPhone 17 Pro Max",
    price: 49000000,
    sale: 0.1,
    rating: 4.8,
    reviews: 686868,
    image:
      "https://images.macrumors.com/t/Pi-mBNronBGf4PKHlQR2WtmQK2w=/1600x0/article-new/2025/02/iphone-17-pro-asherdipps.jpg",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: 24000000,
    sale: 0.05,
    rating: 4.6,
    reviews: 75,
    image:
      "https://cdn.mos.cms.futurecdn.net/3dn8mWLUeYn279a3wsAt7d-970-80.jpg.webp",
  },
  {
    id: 3,
    name: "iPad Air",
    price: 18000000,
    sale: 0,
    rating: 4.5,
    reviews: 40,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-air-select-wifi-spacegray-202203?wid=400&hei=400&fmt=jpeg",
  },
  {
    id: 4,
    name: "Apple Watch Ultra",
    price: 21000000,
    sale: 0.15,
    rating: 4.7,
    reviews: 55,
    image:
      "https://www.apple.com/newsroom/images/2023/09/apple-unveils-apple-watch-ultra-2/article/Apple-Watch-Ultra-2-hero-230912_Full-Bleed-Image.jpg.xlarge_2x.jpg",
  },
   {
    id: 5,
    name: "MacBook Pro 14",
    price: 52000000,
    sale: 0.2,
    rating: 4.9,
    reviews: 200,
    image:
  "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-silver-select-202310?wid=400&hei=400&fmt=jpeg",
  },
   {
    id: 6,
    name: "MacBook Pro 14",
    price: 52000000,
    sale: 0.2,
    rating: 4.9,
    reviews: 200,
    image: "https://store.storeimages.cdn-apple.com/is/macbook-pro-14.jpg", // link ảnh của bạn
  },
   {
    id: 7,
    name: "MacBook Pro 14",
    price: 52000000,
    sale: 0.2,
    rating: 4.9,
    reviews: 200,
    image: "https://store.storeimages.cdn-apple.com/is/macbook-pro-14.jpg", // link ảnh của bạn
  },
   {
    id: 8,
    name: "MacBook Pro 14",
    price: 52000000,
    sale: 0.2,
    rating: 4.9,
    reviews: 200,
    image: "https://store.storeimages.cdn-apple.com/is/macbook-pro-14.jpg", // link ảnh của bạn
  },
   {
    id: 9,
    name: "MacBook Pro 14",
    price: 52000000,
    sale: 0.2,
    rating: 4.9,
    reviews: 200,
    image: "https://store.storeimages.cdn-apple.com/is/macbook-pro-14.jpg", // link ảnh của bạn
  },
   {
    id: 10,
    name: "MacBook Pro 14",
    price: 52000000,
    sale: 0.2,
    rating: 4.9,
    reviews: 200,
    image: "https://store.storeimages.cdn-apple.com/is/macbook-pro-14.jpg", // link ảnh của bạn
  },
   {
    id: 11,
    name: "MacBook Pro 14",
    price: 52000000,
    sale: 0.2,
    rating: 4.9,
    reviews: 200,
    image: "https://store.storeimages.cdn-apple.com/is/macbook-pro-14.jpg", // link ảnh của bạn
  },
   {
    id: 12,
    name: "MacBook Pro 14",
    price: 52000000,
    sale: 0.2,
    rating: 4.9,
    reviews: 200,
    image: "https://store.storeimages.cdn-apple.com/is/macbook-pro-14.jpg", // link ảnh của bạn
  },
];

function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  const formatVND = (value) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const filteredProducts = productsData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white font-sans">
      {/* Topbar */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white text-xs py-2 px-4 flex flex-col md:flex-row justify-between items-center gap-2">
        <div>🚚 Miễn phí giao hàng (Đơn hàng trên 2.000.000₫)</div>
        <div className="flex gap-4 items-center">
          <span>mobileshop@example.com</span>
          <span>|</span>
          <span>+84 999 888 000</span>
          <span>|</span>
          <span className="hidden sm:inline">Đà Nẵng</span>
          <span>|</span>
          {!user ? (
            <Link to="/login" className="underline">
              Đăng nhập
            </Link>
          ) : (
            <button
              onClick={() =>
                dispatch(signout()).then(() => {
                  navigate("/login");
                })
              }
              className="underline"
            >
              Đăng xuất
            </button>
          )}
          <Link to="/admin" className="underline ml-2">
            Admin
          </Link>
        </div>
      </div>

     {/* Header */}
<header className="bg-white shadow-lg px-4 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50">
  <div className="flex items-center gap-3">
    <img
      src="https://i.ibb.co/6bQ6Q0W/toyup-logo.png"
      alt="Mobile Shop Logo"
      className="h-12 w-12 object-contain rounded-full shadow"
    />
    <div>
      <div className="font-bold text-3xl text-indigo-700">Mobile Shop</div>
      <div className="text-xs text-gray-500">
        Hot deals – New arrivals
      </div>
    </div>
  </div>
  <nav className="flex-1 flex items-center gap-6 ml-6 justify-center">
    <Link to="/" className="text-gray-700 font-semibold hover:text-indigo-600">
      Trang chủ
    </Link>
    <Link to="/products" className="text-gray-700 hover:text-indigo-600">
      Sản phẩm
    </Link>
    <a href="#" className="text-gray-700 hover:text-indigo-600">
      Thương hiệu
    </a>
    <a href="#" className="text-gray-700 hover:text-indigo-600">
      Tin tức
    </a>
    <a href="#" className="text-gray-700 hover:text-indigo-600">
      Liên hệ
    </a>
  </nav>
  <div className="flex items-center gap-4">
    …
  </div>
</header>


      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4">
            Điện thoại chính hãng – Ưu đãi khủng
          </h1>
          <p className="text-lg mb-6">
            Mua smartphone – Giao hàng nhanh – Trả góp 0%
          </p>
          <button className="px-8 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow hover:bg-gray-100 transition">
            Mua ngay
          </button>
        </div>
      </section>
      
      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Categories */}
        <div className="bg-white rounded-2xl shadow p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">
            Danh mục nổi bật
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="bg-gradient-to-b from-indigo-50 to-indigo-100 rounded-xl p-4 text-center hover:scale-105 hover:shadow-md transition cursor-pointer"
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-semibold text-gray-700">{cat.name}</div>
                <div className="text-xs text-gray-400">{cat.count} sản phẩm</div>
              </div>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center mb-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full border border-gray-200 rounded-full pl-12 pr-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-200 shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute top-3 left-4 text-gray-400" />
          </div>
        </div>

        {/* Products */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-700">Sản phẩm nổi bật</h2>
            <a href="#" className="text-indigo-500 hover:underline text-sm">
              Xem tất cả
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition p-4 flex flex-col items-center relative"
              >
                {product.sale > 0 && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded font-bold">
                    -{Math.round(product.sale * 100)}%
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded mb-3"
                />
                <div className="font-semibold text-center">{product.name}</div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-indigo-600 font-bold text-lg">
                    {formatVND(
                      Math.round(product.price * (1 - (product.sale || 0)))
                    )}
                  </span>
                  {product.sale > 0 && (
                    <span className="text-gray-400 line-through text-sm">
                      {formatVND(product.price)}
                    </span>
                  )}
                </div>
                <div className="text-yellow-500 text-xs mt-2">
                  ★ {product.rating} ({product.reviews} đánh giá)
                </div>
                <div className="mt-4 flex gap-2 w-full">
                  <button className="flex-1 bg-gray-100 py-2 rounded-full hover:bg-gray-200 transition">
                    Xem chi tiết
                  </button>
                  <button className="flex-1 bg-orange-400 text-white py-2 rounded-full hover:bg-orange-500 transition">
                    Thêm vào giỏ
                  </button>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-bold mb-3 text-white">Mobile Shop</h3>
            <p>Điện thoại chính hãng – Phụ kiện chất lượng</p>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-white">Thông tin</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Điều khoản
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-white">Hỗ trợ</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Đơn hàng của bạn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-white">Liên hệ</h3>
            <p>SĐT: +84 999 888 000</p>
            <p>Email: mobileshop@example.com</p>
            <p>Địa chỉ: 6391 Elgin St. Celina, Delaware 10299</p>
          </div>
        </div>
        <div className="text-center text-xs mt-6 text-gray-500">
          © 2025 Mobile Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
