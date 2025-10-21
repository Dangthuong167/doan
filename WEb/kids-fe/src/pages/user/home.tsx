import {
  FaSearch,
  FaUser,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";
import { addToCart } from "../../utils/cartUtils";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch } from "../../hooks";
import { signout } from "../../redux/authSlice";
import { useState } from "react";
import FooterExtra from "../../components/FooterExtra";

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
    name: "MacBook Air M3",
    price: 34000000,
    sale: 0.1,
    rating: 4.8,
    reviews: 180,
    image:
      "https://happyphone.vn/wp-content/uploads/2024/11/Macbook-Air-M3-13-inch-co-bo-khung-vo-kim-loai-sang-trong-1024x576.jpg",
  },
  {
    id: 7,
    name: "Samsung Galaxy Z Fold 5",
    price: 41000000,
    sale: 0.05,
    rating: 4.7,
    reviews: 230,
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/vn/feature/164792557/vn-feature-galaxy-z-538221573?$FB_TYPE_A_MO_JPG$",
  },
  {
    id: 8,
    name: "Apple Watch Series 9",
    price: 13000000,
    sale: 0,
    rating: 4.5,
    reviews: 90,
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple-watch-series-9-45mm-_5_.png",
  },
  {
    id: 9,
    name: "iPad Pro M4",
    price: 36000000,
    sale: 0.1,
    rating: 4.9,
    reviews: 300,
    image:
      "https://mac24h.vn/images/detailed/94/iPad_Pro_M4_SpaceBlack_1__jj1w-29.webp",
  },
];

function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");

  const formatVND = (value) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const filteredProducts = productsData.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    let matchPrice = true;
    if (priceFilter === "low") matchPrice = p.price < 20000000;
    else if (priceFilter === "mid")
      matchPrice = p.price >= 20000000 && p.price <= 40000000;
    else if (priceFilter === "high") matchPrice = p.price > 40000000;

    let matchBrand = true;
    if (brandFilter === "apple")
      matchBrand =
        p.name.toLowerCase().includes("apple") ||
        p.name.toLowerCase().includes("iphone") ||
        p.name.toLowerCase().includes("macbook") ||
        p.name.toLowerCase().includes("ipad");
    else if (brandFilter === "samsung")
      matchBrand = p.name.toLowerCase().includes("samsung");

    return matchSearch && matchPrice && matchBrand;
  });

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
          <Link to="/cart" className="relative">
            <FaShoppingCart className="cursor-pointer text-xl hover:text-blue-400" />
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-lg px-4 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img
            src="https://insacmau.com/wp-content/uploads/2024/03/logo-dien-thoai-32.jpg"
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
            <Link to="/products" className="text-gray-700 hover:text-indigo-600">Mua ngay</Link>
            
          </button>
        </div>
      </section>

      {/* Products + Thanh lọc */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* ✅ Thanh tìm kiếm & bộ lọc (đã làm đẹp) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white/80 backdrop-blur-md border border-gray-200 p-5 rounded-2xl shadow-lg">
          {/* Ô tìm kiếm */}
          <div className="relative w-full md:w-1/2">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="🔍 Tìm kiếm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition duration-200 placeholder-gray-400 text-gray-700"
            />
          </div>

          {/* Bộ lọc giá */}
          <div className="flex items-center gap-2 text-sm">
            <label className="font-semibold text-gray-700">💰 Giá:</label>
            <select
              onChange={(e) => setPriceFilter(e.target.value)}
              className="border border-gray-300 rounded-full px-3 py-2 outline-none text-gray-700 hover:border-indigo-400 focus:ring-2 focus:ring-indigo-400 transition"
            >
              <option value="all">Tất cả</option>
              <option value="low">Dưới 20 triệu</option>
              <option value="mid">20–40 triệu</option>
              <option value="high">Trên 40 triệu</option>
            </select>
          </div>

          {/* Bộ lọc thương hiệu */}
          <div className="flex items-center gap-2 text-sm">
            <label className="font-semibold text-gray-700">🏷️ Thương hiệu:</label>
            <select
              onChange={(e) => setBrandFilter(e.target.value)}
              className="border border-gray-300 rounded-full px-3 py-2 outline-none text-gray-700 hover:border-indigo-400 focus:ring-2 focus:ring-indigo-400 transition"
            >
              <option value="all">Tất cả</option>
              <option value="apple">Apple</option>
              <option value="samsung">Samsung</option>
            </select>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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
                    {formatVND(Math.round(product.price * (1 - (product.sale || 0))))}
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
                  <Link
                    to={`/product/${product.id}`}
                    className="flex-1 bg-gray-100 py-2 rounded-full hover:bg-gray-200 transition text-center"
                  >
                    Xem chi tiết
                  </Link>

                  <button
                    className="flex-1 bg-orange-400 text-white py-2 rounded-full hover:bg-orange-500 transition"
                    onClick={() => {
                      addToCart(product);
                      navigate("/cart");
                    }}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              Không tìm thấy sản phẩm nào phù hợp.
            </p>
          )}
        </div>
      </main>

      <FooterExtra />
    </div>
  );
}

export default Home;
