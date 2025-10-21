import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";


const productsData = [
  { id: 1, name: "iPhone 17 Pro Max", price: 30000000, brand: "Apple", image:"https://images.macrumors.com/t/Pi-mBNronBGf4PKHlQR2WtmQK2w=/1600x0/article-new/2025/02/iphone-17-pro-asherdipps.jpg"},
  { id: 2, name: "iPhone 16 Pro Max", price: 30000000, brand: "Apple", image:"https://cdn.xtmobile.vn/vnt_upload/news/04_2024/04/iphone-16-pro-max-gia-bao-nhieu-xtmobile.jpg"},
  { id: 3, name: "iPhone 15 Pro Max", price: 30000000, brand: "Apple", image:"https://cdn.tgdd.vn/Products/Images/42/305658/Slider/iphone-15-pro-max-thumb-youtube-1020x570.jpg"},
  { id: 4, name: "iPhone 14 Pro Max", price: 30000000, brand: "Apple", image:"https://minhtuanmobile.com/uploads/products/220908114903-iphone-14-pro-max-1tb2.jpg"},
  { id: 5, name: "iPhone 13 Pro Max", price: 30000000, brand: "Apple", image:"https://cdn.tgdd.vn/Products/Images/42/230529/iphone-13-pro-max-xanh-la-thumb-600x600.jpg"},
  { id: 6, name: "Samsung Galaxy S23", price: 24000000, brand: "Samsung", image: "https://cdn.mos.cms.futurecdn.net/3dn8mWLUeYn279a3wsAt7d-970-80.jpg.webp"},
  { id: 7, name: "iPad Air", price: 18000000, brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-air-select-wifi-spacegray-202203?wid=400&hei=400&fmt=jpeg" },
  { id: 8, name: "Apple Watch Ultra", price: 21000000, brand: "Apple", image: "https://www.apple.com/newsroom/images/2023/09/apple-unveils-apple-watch-ultra-2/article/Apple-Watch-Ultra-2-hero-230912_Full-Bleed-Image.jpg.xlarge_2x.jpg"},
  { id: 9, name: "MacBook Air M2", price: 32000000, brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=400&hei=400&fmt=jpeg" },
  { id: 10, name: "Samsung Galaxy Z Flip 5", price: 28000000, brand: "Samsung", image: "https://clickbuy.com.vn/uploads/pro/samsung-galaxy-z-flip5-8gb-256gb-chinh-hang-lg-192508.jpg"},
  { id: 11, name: "Xiaomi 13 Pro", price: 19000000, brand: "Xiaomi", image: "https://cdn.tgdd.vn/Products/Images/42/282903/Slider/xiaomi-13-pro-thumb-yt-1020x570.jpg"},
  { id: 12, name: "Oppo Find X6 Pro", price: 22000000, brand: "Oppo", image: "https://didongviet.vn/dchannel/wp-content/uploads/2022/11/1cau-hinh-oppo-find-x6-pro-co-gi-moi-didongviet@2x.jpg"},
];

function ProductsPage() {
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const navigate = useNavigate();

  const formatVND = (value) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const filteredProducts = productsData.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = brandFilter === "All" || p.brand === brandFilter;
    const matchesPrice =
      priceFilter === "All" ||
      (priceFilter === "duoi20" && p.price < 20000000) ||
      (priceFilter === "20den30" && p.price >= 20000000 && p.price <= 30000000) ||
      (priceFilter === "tren30" && p.price > 30000000);

    return matchesSearch && matchesBrand && matchesPrice;
  });

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm sản phẩm vào giỏ hàng!");
    navigate("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
        Tất cả sản phẩm
      </h1>

      {/* Thanh tìm kiếm */}
      <div className="relative w-full mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full border border-gray-200 rounded-full pl-12 pr-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-200 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute top-3 left-4 text-gray-400" />
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select
          className="border px-4 py-2 rounded-lg shadow-sm"
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        >
          <option value="All">Tất cả hãng</option>
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Xiaomi">Xiaomi</option>
          <option value="Oppo">Oppo</option>
        </select>

        <select
          className="border px-4 py-2 rounded-lg shadow-sm"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="All">Tất cả giá</option>
          <option value="duoi20">Dưới 20 triệu</option>
          <option value="20den30">Từ 20 - 30 triệu</option>
          <option value="tren30">Trên 30 triệu</option>
        </select>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition p-4 flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover rounded mb-3"
            />
            <div className="font-semibold text-center">{product.name}</div>
            <div className="text-indigo-600 font-bold mt-2">
              {formatVND(product.price)}
            </div>
            <div className="text-sm text-gray-500">{product.brand}</div>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-3 w-full bg-orange-400 text-white py-2 rounded-full hover:bg-orange-500 transition"
            >
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">Không tìm thấy sản phẩm nào.</p>
      )}
    </div>
  );
}

export default ProductsPage;
