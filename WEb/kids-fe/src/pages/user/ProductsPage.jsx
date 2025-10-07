import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const productsData = [
  { id: 1, name: "iPhone 14 Pro", price: 30000000, brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone14-pro-model-select-202209-6-1inch_GEO_EMEA?wid=400&hei=400&fmt=jpeg" },
  { id: 2, name: "Samsung Galaxy S23", price: 24000000, brand: "Samsung", image: "https://images.samsung.com/is/image/samsung/p6pim/vn/sm-s911bzageub/gallery/vn-galaxy-s23-s911-451233-sm-s911bzageub-534850960?$684_547_PNG$" },
  { id: 3, name: "iPad Air", price: 18000000, brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-air-select-wifi-spacegray-202203?wid=400&hei=400&fmt=jpeg" },
  { id: 4, name: "Apple Watch Ultra", price: 21000000, brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MNFD3_VW_PF+watch-49-titanium-ultra-cell-202209?wid=400&hei=400&fmt=jpeg" },
  { id: 5, name: "MacBook Air M2", price: 32000000, brand: "Apple", image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=400&hei=400&fmt=jpeg" },
  { id: 6, name: "Samsung Galaxy Z Flip 5", price: 28000000, brand: "Samsung", image: "https://images.samsung.com/is/image/samsung/p6pim/vn/230801_gallery_galaxyzflip5-cream_front_h_l30?$684_547_PNG$" },
  { id: 7, name: "Xiaomi 13 Pro", price: 19000000, brand: "Xiaomi", image: "https://cdn.tgdd.vn/Products/Images/42/274420/xiaomi-13-pro-den-thumb-600x600.jpg" },
  { id: 8, name: "Oppo Find X6 Pro", price: 22000000, brand: "Oppo", image: "https://cdn.tgdd.vn/Products/Images/42/302235/oppo-find-x6-pro-thumb-600x600.jpg" },
];

function ProductsPage() {
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

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
            <button className="mt-3 w-full bg-orange-400 text-white py-2 rounded-full hover:bg-orange-500 transition">
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
