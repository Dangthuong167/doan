import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const productsData = [
  { id: 1, name: "iPhone 17 Pro Max", price: 30000000, brand: "Apple", desc: "Chip A16 Bionic, màn hình Super Retina XDR 6.1 inch, camera 48MP, pin 3200mAh.", image: "https://images.macrumors.com/t/Pi-mBNronBGf4PKHlQR2WtmQK2w=/1600x0/article-new/2025/02/iphone-17-pro-asherdipps.jpg"},
  { id: 2, name: "Samsung Galaxy S23", price: 24000000, brand: "Samsung", desc: "Snapdragon 8 Gen 2, camera 50MP, pin 3900mAh, màn hình Dynamic AMOLED 120Hz.", image: "https://cdn.mos.cms.futurecdn.net/3dn8mWLUeYn279a3wsAt7d-970-80.jpg.webp"},
  { id: 3, name: "iPad Air", price: 18000000, brand: "Apple", desc: "Màn hình 10.9 inch, chip M1 mạnh mẽ, hỗ trợ Apple Pencil, pin 10 tiếng.", image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-air-select-wifi-spacegray-202203?wid=400&hei=400&fmt=jpeg"},
  { id: 4, name: "MacBook Air M2", price: 32000000, brand: "Apple", desc: "Chip Apple M2, màn hình Retina 13.6 inch, pin 18 tiếng, thiết kế siêu mỏng.", image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=400&hei=400&fmt=jpeg" },
  { id: 5, name: "Oppo Find X6 Pro", price: 22000000, brand: "Oppo", desc: "Snapdragon 8 Gen 2, camera 50MP Hasselblad, sạc nhanh 100W.", image: "https://cdn.tgdd.vn/Products/Images/42/302235/oppo-find-x6-pro-thumb-600x600.jpg" },
];

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = productsData.find((p) => p.id === parseInt(id));
    setProduct(found);
  }, [id]);

  const formatVND = (value) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Đã thêm sản phẩm vào giỏ hàng!");
    navigate("/cart");
  };

  if (!product) return <p className="text-center mt-10">Đang tải sản phẩm...</p>;

  const related = productsData.filter(
    (p) => p.brand === product.brand && p.id !== product.id
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Banner */}
                <div
            className="relative h-64 bg-cover bg-center flex items-center justify-center text-black text-5xl font-extrabold shadow-lg"
            style={{
                backgroundImage:
                "url('https://cdn.tgdd.vn/2023/06/banner/banner-dien-thoai-tet-1200x300.jpg')",
            }}
            >
            <div className="absolute inset-0 bg-white/70"></div>
            <span className="relative z-10">Chi tiết sản phẩm</span>
            </div>


      {/* Sản phẩm */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 bg-white shadow-2xl rounded-3xl mt-[-80px] relative z-10">
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-[85%] h-[85%] object-contain rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-800">{product.name}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{product.desc}</p>

          <div className="text-3xl text-orange-500 font-bold">
            {formatVND(product.price)}
          </div>

          <div className="text-gray-500 text-lg">
            <span className="font-semibold">Hãng:</span> {product.brand}
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-full transition text-lg shadow-md hover:shadow-lg"
          >
            🛒 Thêm vào giỏ hàng
          </button>

          <button
            onClick={() => navigate("/")}
            className="text-indigo-600 underline font-medium text-lg hover:text-indigo-800"
          >
            ← Quay lại trang chủ
          </button>
        </div>
      </div>

      {/* Thông số kỹ thuật */}
      <div className="max-w-6xl mx-auto mt-16 bg-white p-8 rounded-2xl shadow-lg">
        <h3 className="text-3xl font-bold mb-6 border-l-4 border-orange-500 pl-3">
          Thông số kỹ thuật
        </h3>
        <ul className="grid sm:grid-cols-2 gap-4 text-gray-700 text-lg">
          <li>✔️ Màn hình: OLED, 120Hz</li>
          <li>✔️ Camera: 48MP + 12MP</li>
          <li>✔️ Pin: 4000mAh - 5000mAh</li>
          <li>✔️ Chip: {product.brand === "Apple" ? "A16 Bionic" : "Snapdragon 8 Gen 2"}</li>
          <li>✔️ Hệ điều hành: {product.brand === "Apple" ? "iOS" : "Android"}</li>
          <li>✔️ Bảo hành: 12 tháng</li>
        </ul>
      </div>

      {/* Sản phẩm liên quan */}
      {related.length > 0 && (
        <div className="max-w-6xl mx-auto mt-16 mb-20">
          <h3 className="text-3xl font-bold mb-8 border-l-4 border-orange-500 pl-3">
            Sản phẩm cùng hãng
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {related.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`)}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-40 mx-auto object-contain mb-4"
                />
                <div className="font-semibold text-center text-gray-800 text-lg">
                  {item.name}
                </div>
                <div className="text-orange-500 text-center font-bold text-xl">
                  {formatVND(item.price)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
