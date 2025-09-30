import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const productsData = [
  { id: 1, name: "iPhone 14 Pro", price: 30000000, image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone14-pro-model-select-202209-6-1inch_GEO_EMEA?wid=400&hei=400&fmt=jpeg" },
  { id: 2, name: "Samsung Galaxy S23", price: 24000000, image: "https://images.samsung.com/is/image/samsung/p6pim/vn/sm-s911bzageub/gallery/vn-galaxy-s23-s911-451233-sm-s911bzageub-534850960?$684_547_PNG$" },
  { id: 3, name: "iPad Air", price: 18000000, image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-air-select-wifi-spacegray-202203?wid=400&hei=400&fmt=jpeg" },
  { id: 4, name: "Apple Watch Ultra", price: 21000000, image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MNFD3_VW_PF+watch-49-titanium-ultra-cell-202209?wid=400&hei=400&fmt=jpeg" },
];

function ProductsPage() {
  const [search, setSearch] = useState("");

  const formatVND = (value) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const filteredProducts = productsData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
        Tất cả sản phẩm
      </h1>

      <div className="relative w-full mb-8">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full border border-gray-200 rounded-full pl-12 pr-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-200 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute top-3 left-4 text-gray-400" />
      </div>

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
            <button className="mt-3 w-full bg-orange-400 text-white py-2 rounded-full hover:bg-orange-500 transition">
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
